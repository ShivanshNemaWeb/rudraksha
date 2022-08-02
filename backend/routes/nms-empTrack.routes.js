const express = require("express");
const router = express.Router();
const schedule = require("node-schedule");
const _ = require("lodash");

// Auth Middlewares
const {onlyAdmin, authentication} = require("../middlewares/auth");

// Models
const empTrackModel = require("../models/nms-empTrack.model");
const volunteerNMSModel = require("../models/nms-volunteers.model");

// Cron Scheduler - Checks Everyday at 12:00 AM 
schedule.scheduleJob("0 0 * * *", async () => {
    // Do whatever you want in here. Send email, Make  database backup or download data.
    const allTracks = await empTrackModel.find();
    const allVolunteers = await volunteerNMSModel.find();
    if(allTracks.length > 0){
        const todayMonth = new Date();
        for(let i = 0; i < allTracks.length; i++){
            
            // if we move to next month
            // 6(July) < 7(August)
            if(allTracks[i].currentDate.getMonth() < todayMonth.getMonth()){
                // for saving in monthly
                const oldDate = allTracks[i].currentDate;
                let latestCount = allTracks[i].count; // total count till last month
                let prevCount = 0;
                
                // -> The Current Date in DB gets updated - Month by +1
                // -> const newCurrentDate = todayMonth.setMonth(todayMonth.getMonth());
                // -> suppose Today is 01/08/2022 and existing date(currentDate) is 31/07/2022, newCurrentDate becomes 
                // ... currentDate.getMonth() + 1   i.e. 07+01 = 08 and currentDate becomes on updating --> 01/08/2022
                
                // Employee's target is increased by 21
                const newDeployments = allTracks[i].targetDeployment + 21;
                
                // Employee's Track is updated 
                if(allTracks[i].monthlyStatus.length === 0){
                    const allTracksOne = await empTrackModel.findOneAndUpdate({_id: allTracks[i]._id}, {
                        monthlyStatus: [...allTracks[i].monthlyStatus, {"for": oldDate, "count": latestCount}],
                        currentDate: todayMonth,
                        targetDeployment: newDeployments, 
                        $inc: {donationTarget: 2100},
                    }, {new: true, runValidators: true});

                } else {
 
                    let maxTime = allTracks[i].monthlyStatus[0].for.getTime();

                    for(let j = 1; j < allTracks[i].monthlyStatus.length; j++){
                        if(allTracks[i].monthlyStatus[j].for.getTime() > maxTime){
                            maxTime = allTracks[i].monthlyStatus[j].for.getTime();
                        }
                    }

                    for(let j = 0; j < allTracks[i].monthlyStatus.length; j++){
                        if(allTracks[i].monthlyStatus[j].for.getTime() <= maxTime){
                            prevCount += allTracks[i].monthlyStatus[j].count;
                        }
                    }

                    const allTracksOne = await empTrackModel.findOneAndUpdate({_id: allTracks[i]._id}, {
                        monthlyStatus: [...allTracks[i].monthlyStatus, {"for": oldDate, "count": (latestCount - prevCount)}], 
                        currentDate: todayMonth,
                        targetDeployment: newDeployments, 
                    }, {new: true, runValidators: true});
                }
                
            }
            
            // If new year starts, the Employee starts with new Target of Deployments
            // As 11(November) > 0(January)
            if(allTracks[i].currentDate.getMonth() > todayMonth.getMonth()){

                // Kepp track of last year's deployment status
                let totalDeployments = allTracks[i].deployedYearly;
                totalDeployments += allTracks[i].count;

                // Updating the target once again with 21, count with 0, and deployedYearly with above variable
                const allTracksOne = await empTrackModel.findOneAndUpdate({_id: allTracks[i]._id}, {
                    currentDate: todayMonth, 
                    targetDeployment: 21, 
                    deployedYearly: totalDeployments, 
                    count: 0,
                    monthlyStatus: [],
                    donationTarget: 2100,
                }, {new: true, runValidators: true});
            }
        }
    }

    if(allVolunteers.length > 0){
        const todayMonth = new Date();
        for(let i = 0; i < allVolunteers.length; i++){
            if(allVolunteers[i].updatedAt.getMonth() < todayMonth.getMonth()){
                
                const allVolsOne = await volunteerNMSModel.findOneAndUpdate({_id: allVolunteers[i]._id}, 
                    {isDonor: false, $inc: {totalAmountYearly: allVolunteers[i].donationAmt}}, {new: true, runValidators: true});
            }

            if(allVolunteers[i].volStartDate.getMonth() > todayMonth.getMonth()){

                const allVolsOne = await volunteerNMSModel.findOneAndUpdate({_id: allVolunteers[i]._id}, {
                    donationStatus: [],
                    isDonor: false, donationAmt: 0, donationDate: null, orderId: null
                }, {new: true, runValidators: true});

            }
        }
    }

}); 

// job.start();
 
router.get("/countTracker", async(req, res) => {
    try{
        const allTracks = await empTrackModel.find();
        let dat = [];
        if(allTracks.length > 0){
            for(let i = 0; i < allTracks.length; i++){
                dat.push({empId: allTracks[i].empId, target: allTracks[i].targetDeployment, count: allTracks[i].count});
            }
            res.status(200).json({
                success: true,
                data: dat,
                message: "Fetched All the Track Records of NMS of Employees."
            });
            return -1;
        } else {
            res.status(400).json({
                success: true,
                data: "No Tracker Records Found !!",
                message: "Please Try Again !!"
            });
            return -1;
        }


    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

router.post("/add-NMS-Volunteers", authentication, async(req, res) => {
    let {volEmail, volName, volBlood, volDob, empId, volNumber, volAddress, volStartDate, volunteership, volProfession, volProjectHead, volProjectName, remarks, isDonor, donationAmt, donationDate, orderId} = req.body;

    const fullName = _.startCase(volName);
    let amt = isDonor ? Number(donationAmt) : null;
    let donDate = isDonor ? donationDate : null;
    orderId = isDonor ? orderId : null;
    let donationStatus = isDonor ? [{"for": donDate, "amount": amt, "orderId": orderId}] : [];
    try {

        // if(!volEmail || !volName || !volDob || !empId || !volNumber || !volAddress || !volStartDate || !volEndDate || !volProfession || !volProjectHead || !volProjectName || !remarks){
        //     throw new Error("Please Enter the required fields !!");
        // }`

        const anyVolunteer = await volunteerNMSModel.findOne({volEmail});

        if(anyVolunteer){
            throw new Error("The Vounteer with Email ID: '" + volEmail + "' already exists !!");
        }

        const newVolunteer = new volunteerNMSModel({
            volName: fullName,
            volEmail,
            volDob,
            empId,
            volNumber,
            volAddress,
            volBlood,
            volStartDate,
            volunteership,
            volProfession,
            volProjectHead,
            volProjectName,
            remarks,
            isDonor,
            donationAmt: amt,
            donationDate: donDate,
            donationStatus,
            orderId
        });

        const saveVolunteer = await newVolunteer.save();

        // Increasing the count of COUNT in Tracker

        const updateTracker = await empTrackModel.findOneAndUpdate({empId: req.body.empId},
             {$inc: {count: 1, donationTillNow: amt}}, {new: true, runValidators: true});
        res.status(201).json({
            success: true,
            data: {
                saveVolunteer,
                updateTracker
            },
            message: "New Volunteer was added to the DB and the count tracker for Employee's: '" + req.body.empId + "' by 1."
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

router.post("/getVolunteers-ondemand", onlyAdmin, async(req, res) => {
    let {date1} = req.body;
    const dt = new Date(date1);
    // console.log(dt);
    try{
        let vols = [];
        const volunteers = await volunteerNMSModel.find();
        if(volunteers.length > 0){
            for(let i = 0; i < volunteers.length; i++){
                if(volunteers[i].volunteership.getTime() === dt.getTime()){
                    vols.push(volunteers[i]);
                }
            }
        }

        res.status(200).json({
            success: true,
            data: vols,
            message: "Your Data is ready !!"
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

router.post("/acknowledgeVolunteers", onlyAdmin, async(req, res) => {
    const {approve, volId} = req.body;
    try{
        const vol = await volunteerNMSModel.findOne({_id: volId});
        if(!vol) throw new Error("No Volunteer with that ID !!");

        const empRecruiter = await empTrackModel.findOne({empId: vol.empId});
        if(!empRecruiter) throw new Error("No Employee Tracker with that ID !!");


        if(Number(approve)){
            // If approved by Admin.
            const volUpdate = await volunteerNMSModel.findOneAndUpdate({_id: vol._id}, {isActive: true}, {new: true, runValidators: true});

            res.status(200).json({
                success: true,
                data: `Volunteer: ${vol.volName} is 'approved', who is recruited by ${empRecruiter.empId} !!`,
                message: "isActive updated with True (default)!!"
            });

        } else {
            // console.log("Noo");
            const volUpdate = await volunteerNMSModel.findOneAndUpdate({_id: vol._id}, {isActive: false}, {new: true, runValidators: true});
            const updateRecruiter = await empTrackModel.findOneAndUpdate({empId: empRecruiter.empId}, {$inc: {count: -1}}, {new: true, runValidators: true});

            res.status(200).json({
                success: true,
                data: `Volunteer: ${vol.volName} is 'not approved', who is recruited by ${empRecruiter.empId} !!`,
                message: "isActive updated with False !!"
            });

        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

router.post("/activeVolunteer", onlyAdmin, async(req, res) => {
    const {volId} = req.body;
    try{
        const volunteer = await volunteerNMSModel.findOne({_id: volId});
        if(!volunteer) throw new Error("No Volunteers with ID: " + volId);

        if(volunteer.isActive){
            res.status(200).json({
                success: true,
                data: volunteer,
                message: `The Volunteer with ID: ${volId} is already ACTIVE`
            });
        } else {
            const volUpdate = await volunteerNMSModel.findOneAndUpdate({_id: volId}, {isActive: true}, {new: true, runValidators: true});
            const updateRecruiter = await empTrackModel.findOneAndUpdate({empId: volunteer.empId}, {$inc: {count: 1}}, {new: true, runValidators: true});
            res.status(200).json({
                success: true,
                data: volUpdate,
                message: `The Volunteer with ID: ${volId} is now ACTIVE !!`
            });
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

router.get("/allVolunteers", authentication, async(req, res) => {
    try{
        const allVolunteers = await volunteerNMSModel.find();
        if(allVolunteers.length > 0){
            res.status(200).json({
                success: true,
                data: allVolunteers,
                message: "All Volunteers Data fetched !!"
            });
            return -1;
        } else {
            res.status(200).json({
                success: true,
                data: [],
                message: "No Records found for Volunteers in NMS !!"
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

router.post("/donate", authentication, async(req, res) => {
    const {volId, amt, donDate, orderId} = req.body;
    try{
        const obj = {"for": donDate, "amount": amt, "orderId": orderId};
        const volOne = await volunteerNMSModel.findOne({_id: volId});

        if(volOne.isDonor){
            res.status(400).json({
                success: false,
                data: `${volOne.volName} already Donated DATED: ${volOne.donationDate} !! Thanks for the Donation 🙏, Please Donate the amount coming next month !!`,
                message: "Please try again for next month !!"
            });
            return -1;
        }

        // console.log(money);

        const updateVolunteer = await volunteerNMSModel.findOneAndUpdate({_id: volOne._id}, {
            donationStatus: [...volOne.donationStatus, obj],
            isDonor: true,
            donationDate: donDate,
            $inc: {donationAmt: amt},
            orderId
        }, {new: true, runValidators: true});

        const updateTracker = await empTrackModel.findOneAndUpdate({empId: volOne.empId}, {$inc: {donationTillNow: updateVolunteer.donationAmt}}, {new: true, runValidators: true});

        res.status(200).json({
            success: true,
            data: {
                updateVolunteer,
                updateTracker
            },
            message: "Volunteer Updated with ID: " + volId
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

router.get("/donationTracker", async(req, res) => {
    let dat = [];
    try{
        const allTracks = await empTrackModel.find();
        if(allTracks.length > 0){
            for(let i = 0; i < allTracks.length; i++){
                dat.push({empId: allTracks[i].empId, target: allTracks[i].donationTarget, count: allTracks[i].donationTillNow});
            }
            res.status(200).json({
                success: true,
                data: dat,
                message: "Fetched All the Track Records of NMS of Employees."
            });
            return -1;
        } else {
            res.status(400).json({
                success: true,
                data: "No Tracker Records Found !!",
                message: "Please Try Again !!"
            });
            return -1;
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

module.exports = router;