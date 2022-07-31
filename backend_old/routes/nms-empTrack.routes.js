const express = require("express");
const router = express.Router();
const schedule = require("node-schedule");
const _ = require("lodash");
const sharp = require("sharp");

// Auth Middlewares
const {onlyAdmin} = require("../middlewares/auth");

// Models
const empTrackModel = require("../models/nms-empTrack.model");
const volunteerNMSModel = require("../models/nms-volunteers.model");

// Cron Scheduler - Checks Everyday at 12:00 AM
schedule.scheduleJob("0 0 * * *", async () => {
    // Do whatever you want in here. Send email, Make  database backup or download data.
    const allTracks = await empTrackModel.find();
    const todayMonth = new Date();
    if(allTracks.length > 0){
        for(let i = 0; i < allTracks.length; i++){
            
            // if we move to next month
            // 6(July) < 7(August)
            if(allTracks[i].currentDate.getMonth() < todayMonth.getMonth()){
                
                // The Current Date in DB gets updated - Month by +1
                // const newCurrentDate = todayMonth.setMonth(todayMonth.getMonth());
                const newCurrentDate = todayMonth.setMonth(allTracks[i].currentDate.getMonth() + 1);
                
                // Employee's target is increased by 21
                const newDeployments = allTracks[i].targetDeployment + 21;
                
                // Employee's Track is updated 
                const allTracksOne = await empTrackModel.findOneAndUpdate({_id: allTracks[i]._id}, {currentDate: newCurrentDate, targetDeployment: newDeployments}, {new: true, runValidators: true});
            }
            
            // If new year starts, the Employee starts with new Target of Deployments
            // As 11(December) > 0(January)
            if(allTracks[i].currentDate.getMonth() > todayMonth.getMonth()){

                // Kepp track of last year's deployment status
                let totalDeployments = allTracks[i].deployedYearly;
                totalDeployments += allTracks[i].count;

                // Updating the target once again with 21, count with 0, and deployedYearly with above variable
                const allTracksOne = await empTrackModel.findOneAndUpdate({_id: allTracks[i]._id}, {currentDate: todayMonth, targetDeployment: 21, deployedYearly: totalDeployments, count: 0}, {new: true, runValidators: true});
            }

        }
    }
});


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
})

router.post("/add-NMS-Volunteers", async(req, res) => {
    // console.log(req.body);
    // console.log("Files: "+req.files);
    const {volEmail, volName, volDob, empId, volNumber, volAddress, volStartDate, volEndDate, volProfession, volProjectHead, volProjectName, remarks} = req.body;

    const fullName = _.startCase(volName);
    try {

        // if(!volEmail || !volName || !volDob || !empId || !volNumber || !volAddress || !volStartDate || !volEndDate || !volProfession || !volProjectHead || !volProjectName || !remarks){
        //     throw new Error("Please Enter the required fields !!");
        // }

        const anyVolunteer = await volunteerNMSModel.findOne({volEmail});

        if(anyVolunteer){
            throw new Error("The Vounteer with Email ID: '" + volEmail + "' already exists !!");
        }

        const newVolunteer = new volunteerNMSModel({
            volName: fullName,
            // profilePic: await sharp(req.files.profilePic[0].buffer).resize({ width: 200, height: 200 }).png().toBuffer(),
            volEmail,
            volDob,
            empId,
            volNumber,
            volAddress,
            volStartDate,
            volEndDate,
            volProfession,
            volProjectHead,
            volProjectName,
            remarks,
        });

        const saveVolunteer = await newVolunteer.save();

        // Increasing the count of COUNT in Tracker

        const updateTracker = await empTrackModel.findOneAndUpdate({empId: req.body.empId}, {$inc: {count: 1}}, {new: true, runValidators: true});
        
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
})

module.exports = router;