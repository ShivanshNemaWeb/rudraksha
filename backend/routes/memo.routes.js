const express = require('express');
const router = express.Router();
const schedule = require("node-schedule");

const {onlyAdmin, authentication} = require("../middlewares/auth");

const memoModel = require("../models/memo.model");

schedule.scheduleJob("0 0 * * *", async() => {
    const todayDate = new Date();
    try{
        const memo = await memoModel.find();
        if(memo.length > 0){
            for(let i = 0; i < memo.length; i++){
                if(memo[i].currentDate.getMonth() > todayDate.getMonth()){
                    const updateMemo = await memoModel.findOneAndUpdate({_id: memo[i]._id}, {$inc: {totalMemoYearly: memo[i].memoCount}, memoCount: 0, currentDate: todayDate}, {new: true, runValidators: true});
                }
            }
        }

    }catch(e){
        console.log(e);
    }

});

router.get("/getMemoCount", async(req, res) => {
    try{
        const allEmp = await memoModel.find();
        let dat = [];
        let grade = null;
        if(allEmp.length > 0){
            for (let i = 0; i < allEmp.length; i++) {
                if(allEmp[i].memoCount === 0) {grade = "A"}
                else if(allEmp[i].memoCount === 1) {grade = "B"}
                else if(allEmp[i].memoCount === 2) {grade = "C"}
                else {grade = "D"}
                const obj = {"empId": allEmp[i].empId, "memoCount": allEmp[i].memoCount, "Grade": grade};
                dat.push(obj);
            }
        }

        res.status(200).json({
            success: true,
            data: dat,
            message: "Memo Count and Grade Level fetched for all the Employees !!"
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!"
        });
    }
});

// CAN ONLY BE PERFORMED BY SPLLY. AUTHORIZED EMPLOYEES
router.post("/issueMemo", async(req, res) => {
    const {empId, memoDate, memoType, remarks} = req.body;
    const obj = {"for": memoDate, "memoType": memoType, "remarks": remarks};
    try{
        const oneEmp = await memoModel.findOne({empId});
        if(!oneEmp) throw new Error("No MEMO table found for EMP ID: " + empId);

        const updateMemo = await memoModel.findOneAndUpdate({empId}, {$inc: {memoCount: 1}, isOffender: true, remarks, latestMemoIssuedOn: memoDate, latestMemoTypeIssued: memoType, memoStatus: [...oneEmp.memoStatus, obj]}, {new: true, runValidators: true});

        res.status(200).json({
            success: true,
            data: updateMemo,
            message: "+1 Memo for EMP ID: " + empId
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!"
        });
    }
});

module.exports = router;