const express = require('express');
const router = express.Router();

const digitalSaleModel = require("../models/salesDIGITAL.model");
const fncgSalesModel = require("../models/salesFNCG.model");

async function monthly(empId, month, year){
    try{
        const digital = await digitalSaleModel.findOne({empId});
        const fncg = await fncgSalesModel.findOne({empId});

        if(!digital) throw new Error("No Employee found in DIGITAL SALES TABLE !!");
        if(!fncg) throw new Error("No Employee found in FNCG SALES TABLE !!");

        let digitalSales = [];
        let fncgSales = [];

        if(digital.saleStatus.length > 0){
            for(let i = 0; i < digital.saleStatus.length; i++) {
                if(digital.saleStatus[i].for.getMonth() === Number(month) && digital.saleStatus[i].for.getFullYear() === Number(year)){
                    digitalSales.push({"DATED": digital.saleStatus[i].for.toDateString(), "AMOUNT": digital.saleStatus[i].amount, "REMARKS": digital.saleStatus[i].remarks});
                }
            }
        }

        if(fncg.saleStatus.length > 0){
            for(let i = 0; i < fncg.saleStatus.length; i++) {
                fncgSales.push({"DATED": fncg.saleStatus[i].for.toDateString(), "AMOUNT": fncg.saleStatus[i].amount, "REMARKS": fncg.saleStatus[i].remarks});
            }
        }

        return {digitalSales, fncgSales};

    }catch(e){
        return e;
    }
}

router.post("/reports-monthly-salesms", async(req, res) => {
    const {empId, month, year} = req.body;
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

router.post("/reports-quarterly-salesms", async(req, res) => {
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

module.exports = router;