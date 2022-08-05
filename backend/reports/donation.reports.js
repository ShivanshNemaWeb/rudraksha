const express = require('express');
const router = express.Router();

// Auth Middlewares
const {onlyAdmin, authentication} = require("../middlewares/auth");

// Models
const recruiters = require("../models/nms-empTrack.model");
const nmsVolunteers = require("../models/nms-volunteers.model");

async function monthly(empId, month, year){
    try{
        const oneEmp = await recruiters.findOne({empId});
        const vols = await nmsVolunteers.find({empId});

        if(!oneEmp) throw new Error("No Employee found in EMP TRACK MASTER TABLE !!");

        let dat = [];

        if(vols.length > 0){
            for(let i = 0; i < vols.length; i++){
                if(vols[i].donationStatus.length > 0){
                    for(let j = 0; j < vols[i].donationStatus.length; j++){
                        if(vols[i].donationStatus[j].for.getMonth() === Number(month) && vols[i].donationStatus[j].for.getFullYear() === Number(year)){
                            dat.push({"NAME": vols[i].volName, "DATED": vols[i].donationStatus[j].for.toDateString(), "AMOUNT": vols[i].donationStatus[j].amount, "ORDER_ID": vols[i].donationStatus[j].orderId});
                        }
                    }
                }
            }
        }

        return dat;
    }catch(e){
        return e;
    }
}

router.post("/reports-monthly-dms", async(req, res) => {
    const {empId, month, year} = req.body;
    // const nowDate = new Date(Number(year), Number(month), 1);
    // let mnth = nowDate.toLocaleString('default', { month: 'long' });
    try{
        let dat = await monthly(empId, month, year);

        res.status(200).json({
            success: true,
            data: dat,
            message: "Data Fetched for Month: "+(Number(month) + 1)
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Somethin went wrong !",
            message: "Somethin went wrong !"
        });
    }
});

router.post("/reports-quarterly-dms", async(req, res) => {
    const {empId, quarter, year} = req.body;
    let org = [];
    try{
        if(Number(quarter) === 0){
            let dat0 = await monthly(empId, 0, year);
            let dat1 = await monthly(empId, 1, year);
            let dat2 = await monthly(empId, 2, year);
            let dat3 = await monthly(empId, 3, year);
            org.push(...dat0, ...dat1, ...dat2, ...dat3);
            // console.log(dat0, dat1, dat2, dat3);
        } else if(Number(quarter) === 1){
            let dat4 = await monthly(empId, 4, year);
            let dat5 = await monthly(empId, 5, year);
            let dat6 = await monthly(empId, 6, year);
            let dat7 = await monthly(empId, 7, year);
            org.push(...dat4, ...dat5, ...dat6, ...dat7);
        } else if(Number(quarter) === 2){
            let dat8 = await monthly(empId, 8, year);
            let dat9 = await monthly(empId, 9, year);
            let dat10 = await monthly(empId, 10, year);
            let dat11 = await monthly(empId, 11, year);
            org.push(...dat8, ...dat9, ...dat10, ...dat11);
        }
        
        res.status(200).json({
            success: true,
            data: org,
            message: "Data Fetched for Q"+(Number(quarter) + 1)
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Somethin went wrong !",
            message: "Somethin went wrong !"
        });
    }
});

router.post("/reports-halfYearly-dms", async(req, res) => {
    const {empId, half, year} = req.body;
    let org = [];
    try{
        if(Number(half) === 0){
            let dat0 = await monthly(empId, 0, year);
            let dat1 = await monthly(empId, 1, year);
            let dat2 = await monthly(empId, 2, year);
            let dat3 = await monthly(empId, 3, year);
            let dat4 = await monthly(empId, 4, year);
            let dat5 = await monthly(empId, 5, year);
            org.push(...dat0, ...dat1, ...dat2, ...dat3, ...dat4, ...dat5);
        } else if(Number(half) === 1){
            let dat6 = await monthly(empId, 6, year);
            let dat7 = await monthly(empId, 7, year);
            let dat8 = await monthly(empId, 8, year);
            let dat9 = await monthly(empId, 9, year);
            let dat10 = await monthly(empId, 10, year);
            let dat11 = await monthly(empId, 11, year);
            org.push(...dat6, ...dat7, ...dat8, ...dat9, ...dat10, ...dat11);
        }

        res.status(200).json({
            success: true,
            data: org,
            message: "Data Fetched for HY-"+(Number(half) + 1)
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Somethin went wrong !",
            message: "Somethin went wrong !"
        });
    }
});

router.post("/reports-yearly-dms", async(req, res) => {
    const {empId, year} = req.body;
    let org = [];
    try{
        let dat0 = await monthly(empId, 0, year);
        let dat1 = await monthly(empId, 1, year);
        let dat2 = await monthly(empId, 2, year);
        let dat3 = await monthly(empId, 3, year);
        let dat4 = await monthly(empId, 4, year);
        let dat5 = await monthly(empId, 5, year);
        let dat6 = await monthly(empId, 6, year);
        let dat7 = await monthly(empId, 7, year);
        let dat8 = await monthly(empId, 8, year);
        let dat9 = await monthly(empId, 9, year);
        let dat10 = await monthly(empId, 10, year);
        let dat11 = await monthly(empId, 11, year);
        org.push(...dat0, ...dat1, ...dat2, ...dat3, ...dat4, ...dat5, ...dat6, ...dat7, ...dat8, ...dat9, ...dat10, ...dat11);

        res.status(200).json({
            success: true,
            data: org,
            message: "Data Fetched for Y-"+year
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Somethin went wrong !",
            message: "Somethin went wrong !"
        });
    }
});

module.exports = router;