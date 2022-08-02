const express = require('express');
const router = express.Router();
const schedule = require("node-schedule");

const digitalSaleModel = require("../models/salesDIGITAL.model");
const fncgSalesModel = require("../models/salesFNCG.model");

schedule.scheduleJob("0 0 * * *", async() => {
    const todayDate = new Date();
    try{
        const digital = await digitalSaleModel.find();
        const fncg = await fncgSalesModel.find();

        if(digital.length > 0){
            for(let i = 0; i < digital.length; i++){
                if(digital[i].currentDate.getMonth() < todayDate.getMonth()){
                    const updateDigitalOne = await digitalSaleModel.findOneAndUpdate({_id: digital[i]._id}, {
                        $inc: {targetSales: 15000}, isSeller: false, currentDate: todayDate
                    }, {new: true, runValidators: true});
                }

                if(digital[i].currentDate.getMonth() > todayDate.getMonth()){
                    const updateDigitalOne = await digitalSaleModel.findOneAndUpdate({_id: digital[i]._id}, {
                        targetSales: 15000, isSeller: false, $inc: {totalSaleAmount: digital[i].saleAmount}, saleAmount: 0, currentDate: todayDate
                    }, {new: true, runValidators: true});
                }

            }
        }

        if(fncg.length > 0){
            for(let i = 0; i < fncg.length; i++){
                if(fncg[i].currentDate.getMonth() < todayDate.getMonth()){
                    const updateFNCGOne = await fncgSalesModel.findOneAndUpdate({_id: fncg[i]._id}, {
                        $inc: {targetSales: 3000}, isSeller: false, currentDate: todayDate
                    }, {new: true, runValidators: true});
                }

                if(digital[i].currentDate.getMonth() > todayDate.getMonth()){
                    const updateFNCGOne = await fncgSalesModel.findOneAndUpdate({_id: fncg[i]._id}, {
                        targetSales: 15000, isSeller: false, $inc: {totalSaleAmount: fncg[i].saleAmount}, saleAmount: 0, currentDate: todayDate
                    }, {new: true, runValidators: true});
                }
            }
        }

    }catch(e){
        console.log(e);
    }

});

router.post("/addSales", async(req, res) => {
    const {empId, saleType, amount, saleDate, remarks} = req.body;
    const obj = {"for": saleDate, "amount": amount, "remarks": remarks};
    try{
        if(saleType === "DIGITAL"){
            const oneEmp = await digitalSaleModel.findOne({empId});

            if(!oneEmp) throw new Error("No Employee Record found in DIGITAL SALES !!");

            const updateEmp = await digitalSaleModel.findOneAndUpdate({_id: oneEmp._id}, {saleOn: saleDate, $inc: {saleAmount: amount}, remarks, isSeller: true, saleStatus: [...oneEmp.saleStatus, obj]}, {new: true, runValidators: true});

            res.status(200).json({
                success: true,
                data: updateEmp,
                message: "Successfully Updated the Digital SAles table for EMP ID: " + empId
            });
            return -1;
        } else {
            const fncg = await fncgSalesModel.findOne({empId});
            if(!fncg) throw new Error("No Employee Record found in FNCG SALES !!");

            const updateFNCG = await fncgSalesModel.findOneAndUpdate({_id: fncg._id}, {saleOn: saleDate, $inc: {saleAmount: amount}, remarks, isSeller: true, saleStatus: [...oneEmp.saleStatus, obj]}, {new: true, runValidators: true});

            res.status(200).json({
                success: true,
                data: updateFNCG,
                message: "Successfully Updated the FNCG Sales table for EMP ID: " + empId
            });
            return -1;
        }
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