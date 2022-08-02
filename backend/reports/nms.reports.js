const express = require('express');
const router = express.Router();

const {onlyAdmin} = require("../middlewares/auth");

const trackModel = require("../models/nms-empTrack.model");
const volModel = require("../models/nms-volunteers.model");

router.post("/reports-monthly-nms", async(req, res) => {
    const {empId, month, year} = req.body;
    try{
        const oneEmp = await trackModel.findOne({empId: empId});
        const volunteers = await volModel.find({empId: empId, isActive: true});
        const nowDate = new Date(Number(year), Number(month), 1);
        let mnth = nowDate.toLocaleString('default', { month: 'long' });
        // console.log(mnth);
        let count = 0;
        if(!oneEmp) throw new Error("No Track Record Exists for Employee with ID: " + empId);
        let final = [];
        let vols = [];

        if(volunteers.length > 0){
            for(let i = 0; i < volunteers.length; i++){
                if(volunteers[i].volStartDate.getMonth() === Number(month) && volunteers[i].volStartDate.getFullYear() === Number(year)){
                    vols.push(volunteers[i]);
                }
            }
        }

        if(oneEmp.monthlyStatus.length > 0){
            for(let i = 0; i < oneEmp.monthlyStatus.length; i++){
                if(oneEmp.monthlyStatus[i].for.getMonth() === Number(month) && oneEmp.monthlyStatus[i].for.getFullYear() === Number(year)){
                    mnth = oneEmp.monthlyStatus[i].for.toLocaleString('default', { month: 'long' });
                    count = oneEmp.monthlyStatus[i].count;
                
                }
            }
        }

        final.push({label: mnth, value: count, color: "#D61C4E"});

        res.status(200).json({
            success: true,
            data: {
                final,
                vols
            },
            message: "Data Fetched for month: " + mnth + " ,for ID: " + empId
        });

    }catch(e){
        res.status(500).json({
            success: false,
            data: "Somethin went wrong !",
            message: e
        })
    }
});

router.post("/reports-quarterly-nms", async(req, res) => {
    const {quarter, empId, year} = req.body;

    const quarter0 = {
        "January": 0, 
        "February": 0, 
        "March": 0, 
        "April": 0
    };

    const quarter1 = {
        "May": 0, 
        "June": 0,
        "July": 0, 
        "August": 0
    };

    const quarter2 = {
        "September": 0, 
        "October": 0, 
        "November": 0, 
        "December": 0
    }
    
    try{
        const oneEmp = await trackModel.findOne({empId: empId});
        const volunteers = await volModel.find({empId: empId, isActive: true});
        if(!oneEmp) throw new Error("No Track Record Exists for Employee with ID: " + empId);
        let vols = [];
        if(volunteers.length > 0){
            for(let i = 0; i < volunteers.length; i++){
                if(Number(quarter) === 0){
                    if((volunteers[i].volStartDate.getMonth() === 0 || volunteers[i].volStartDate.getMonth() === 1 || volunteers[i].volStartDate.getMonth() === 2 || volunteers[i].volStartDate.getMonth() === 3) && volunteers[i].volStartDate.getFullYear() === Number(year)){
                        vols.push(volunteers[i]);
                    }
                }
                if(Number(quarter) === 1){
                    if((volunteers[i].volStartDate.getMonth() === 4 || volunteers[i].volStartDate.getMonth() === 5 || volunteers[i].volStartDate.getMonth() === 6 || volunteers[i].volStartDate.getMonth() === 7) && volunteers[i].volStartDate.getFullYear() === Number(year)){
                        vols.push(volunteers[i]);
                    }
                }
                if(Number(quarter) === 2){
                    if((volunteers[i].volStartDate.getMonth() === 8 || volunteers[i].volStartDate.getMonth() === 9 || volunteers[i].volStartDate.getMonth() === 10 || volunteers[i].volStartDate.getMonth() === 11) && volunteers[i].volStartDate.getFullYear() === Number(year)){
                        vols.push(volunteers[i]);
                    }
                }
            }   
        }

        if(oneEmp.monthlyStatus.length > 0){
            for(let i = 0; i < oneEmp.monthlyStatus.length; i++){
                if(Number(quarter) === 0){
    
                    if((oneEmp.monthlyStatus[i].for.getMonth() === 0 || oneEmp.monthlyStatus[i].for.getMonth() === 1 || oneEmp.monthlyStatus[i].for.getMonth() === 2 || oneEmp.monthlyStatus[i].for.getMonth() === 3) && (oneEmp.monthlyStatus[i].for.getFullYear() === Number(year))){
    
                        let mnth = oneEmp.monthlyStatus[i].for.toLocaleString('default', { month: 'long' });
                        if(mnth in quarter0){
                            quarter0[mnth] += oneEmp.monthlyStatus[i].count;
                        }
    
                    }
    
                }
    
                if(Number(quarter) === 1){

                    // console.log("i: "+ i +"\nyes\n"+oneEmp.monthlyStatus[i].for.getFullYear());
                    if((oneEmp.monthlyStatus[i].for.getMonth() === 4 || oneEmp.monthlyStatus[i].for.getMonth() === 5 || oneEmp.monthlyStatus[i].for.getMonth() === 6 || oneEmp.monthlyStatus[i].for.getMonth() === 7) && (oneEmp.monthlyStatus[i].for.getFullYear() === Number(year))){
    
                        let mnth = oneEmp.monthlyStatus[i].for.toLocaleString('default', { month: 'long' });
                        if(mnth in quarter1){
                            quarter1[mnth] += oneEmp.monthlyStatus[i].count;
                        }
    
                    }
    
                }
    
                if(Number(quarter) === 2){
    
                    if((oneEmp.monthlyStatus[i].for.getMonth() === 8 || oneEmp.monthlyStatus[i].for.getMonth() === 8 || oneEmp.monthlyStatus[i].for.getMonth() === 10 || oneEmp.monthlyStatus[i].for.getMonth() === 11) && (oneEmp.monthlyStatus[i].for.getFullYear() === Number(year))){
    
                        let mnth = oneEmp.monthlyStatus[i].for.toLocaleString('default', { month: 'long' });
                        if(mnth in quarter2){
                            quarter2[mnth] += oneEmp.monthlyStatus[i].count;
                        }
    
                    }
    
                }
    
            }
        }

        let final = [];
        let colors = ["#D61C4E", "#FEB139", "#CEE5D0", "#1F4690"];
        let col = 0;

        if(Number(quarter) === 0){
            for(let key in quarter0){
                if(quarter0.hasOwnProperty(key)){
                    final.push({
                        label: key,
                        value: quarter0[key],
                        color: colors[col]
                    });
                    col++;
                }
            }
            res.status(200).json({
                success: true,
                data: {
                    final,
                    vols
                },
                message: "Data is ready for - Q" + (Number(quarter)+1)
            });
            return -1;
        } 
        else if(Number(quarter) === 1){
            for(let key in quarter1){
                if(quarter1.hasOwnProperty(key)){
                    final.push({
                        label: key,
                        value: quarter1[key],
                        color: colors[col]
                    });
                    col++;
                }
            }
            res.status(200).json({
                success: true,
                data: {
                    final,
                    vols
                },
                message: "Data is ready for - Q" + (Number(quarter)+1)
            });
            return -1;
        }
        else if(Number(quarter) === 2){
            for(let key in quarter2){
                if(quarter2.hasOwnProperty(key)){
                    final.push({
                        label: key,
                        value: quarter2[key],
                        color: colors[col]
                    });
                    col++;
                }
            }
            res.status(200).json({
                success: true,
                data: {
                    final,
                    vols
                },
                message: "Data is ready for - Q" + (Number(quarter)+1)
            });
            return -1;
        }


    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Somethin went wrong !",
            message: e
        });
    }
});

router.post("/reports-halfYearly-nms", async(req, res) => {
    const {half, empId, year} = req.body;

    const half0 = {
        "January": 0, 
        "February": 0, 
        "March": 0, 
        "April": 0,
        "May": 0, 
        "June": 0
    };

    const half1 = {
        "July": 0, 
        "August": 0,
        "September": 0, 
        "October": 0, 
        "November": 0, 
        "December": 0
    };
    
    try{
        const oneEmp = await trackModel.findOne({empId: empId});
        const volunteers = await volModel.find({empId: empId, isActive: true});
        if(!oneEmp) throw new Error("No Track Record Exists for Employee with ID: " + empId);
        let vols = [];

        if(volunteers.length > 0){
            for(let i = 0; i < volunteers.length; i++){
                if(Number(half) === 0){
                    if(volunteers[i].volStartDate.getMonth() === 0 || volunteers[i].volStartDate.getMonth() === 1 || volunteers[i].volStartDate.getMonth() === 2 || volunteers[i].volStartDate.getMonth() === 3 || volunteers[i].volStartDate.getMonth() === 4 || volunteers[i].volStartDate.getMonth() === 5){
                        vols.push(volunteers[i]);
                    }
                }
                if(Number(half) === 1){
                    if(volunteers[i].volStartDate.getMonth() === 6 || volunteers[i].volStartDate.getMonth() === 7 || volunteers[i].volStartDate.getMonth() === 8 || volunteers[i].volStartDate.getMonth() === 9 || volunteers[i].volStartDate.getMonth() === 10 || volunteers[i].volStartDate.getMonth() === 11){
                        vols.push(volunteers[i]);
                    }
                }
            }
        }

        if(oneEmp.monthlyStatus.length > 0){
            for(let i = 0; i < oneEmp.monthlyStatus.length; i++){
                if(Number(half) === 0){
    
                    if((oneEmp.monthlyStatus[i].for.getMonth() === 0 || oneEmp.monthlyStatus[i].for.getMonth() === 1 || oneEmp.monthlyStatus[i].for.getMonth() === 2 || oneEmp.monthlyStatus[i].for.getMonth() === 3 || oneEmp.monthlyStatus[i].for.getMonth() === 4 || oneEmp.monthlyStatus[i].for.getMonth() === 5) && (oneEmp.monthlyStatus[i].for.getFullYear() === Number(year))){
    
                        let mnth = oneEmp.monthlyStatus[i].for.toLocaleString('default', { month: 'long' });
                        if(mnth in half0){
                            half0[mnth] += oneEmp.monthlyStatus[i].count;
                        }
    
                    }
    
                }
    
                if(Number(half) === 1){
    
                    if((oneEmp.monthlyStatus[i].for.getMonth() === 6 || oneEmp.monthlyStatus[i].for.getMonth() === 7 || oneEmp.monthlyStatus[i].for.getMonth() === 8 || oneEmp.monthlyStatus[i].for.getMonth() === 9 || oneEmp.monthlyStatus[i].for.getMonth() === 10 || oneEmp.monthlyStatus[i].for.getMonth() === 11) && (oneEmp.monthlyStatus[i].for.getFullYear() === Number(year))){
    
                        let mnth = oneEmp.monthlyStatus[i].for.toLocaleString('default', { month: 'long' });
                        if(mnth in half1){
                            half1[mnth] += oneEmp.monthlyStatus[i].count;
                        }
    
                    }
    
                }
    
            }
        }

        let final = [];
        let colors = ["#395B64", "#A5C9CA", "#D61C4E", "#FEB139", "#CEE5D0", "#1F4690", "#898AA6", "#FFC4C4"];
        let col = 0;

        if(Number(half) === 0){
            for(let key in half0){
                if(half0.hasOwnProperty(key)){
                    final.push({
                        label: key,
                        value: half0[key],
                        color: colors[col]
                    });
                    col++;
                }
            }
            res.status(200).json({
                success: true,
                data: {
                    final,
                    vols
                },
                message: "Data is ready for - HY-" + (Number(half)+1)
            });
            return -1;

        } else if(Number(half) === 1) {
            for(let key in half1){
                if(half1.hasOwnProperty(key)){
                    final.push({
                        label: key,
                        value: half1[key],
                        color: colors[col]
                    });
                    col++;
                }
            }
            res.status(200).json({
                success: true,
                data: {
                    final,
                    vols
                },
                message: "Data is ready for - HY-" + (Number(half)+1)
            });
            return -1;
        }


    }catch(e){
        res.status(500).json({
            success: false,
            data: "Somethin went wrong !",
            message: e
        });
    }
});

router.post("/reports-yearly-nms", async(req, res) => {
    const {empId, year} = req.body;
    try{
        const oneEmp = await trackModel.findOne({empId: empId});
        const volunteers = await volModel.find({empId: empId, isActive: true});
        if(!oneEmp) throw new Error("No Track Record Exists for Employee with ID: " + empId);
        let vols = [];

        const months = {
            "January": 0, 
            "February": 0, 
            "March": 0, 
            "April": 0, 
            "May": 0, 
            "June": 0,
            "July": 0, 
            "August": 0, 
            "September": 0, 
            "October": 0, 
            "November": 0, 
            "December": 0
        }

        if(volunteers.length > 0){
            for(let i = 0; i < volunteers.length; i++){
                if(volunteers[i].volStartDate.getFullYear() === Number(year)){
                    vols.push(volunteers[i]);
                }
            }
        }

        if(oneEmp.monthlyStatus.length > 0){
            for(let i = 0; i < oneEmp.monthlyStatus.length; i++){
                if(oneEmp.monthlyStatus[i].for.getFullYear() === Number(year)){
                    let mnth = oneEmp.monthlyStatus[i].for.toLocaleString('default', { month: 'long' });
                    if(mnth in months){
                        months[mnth] += oneEmp.monthlyStatus[i].count;
                    }
                }
            }
        }

        let final = [];
        let colors = ["#395B64", "#A5C9CA", "#D61C4E", "#FEB139", "#CEE5D0", "#1F4690", "#898AA6", "#FFC4C4", "#876445", "#7A4069", "#2C3639", "#3EC70B"];
        let col = 0;

        for(let key in months){
            if(months.hasOwnProperty(key)){
                final.push({
                    label: key,
                    value: months[key],
                    color: colors[col]
                });
                col++;
            }
        }


        res.status(200).json({
            success: true,
            data: {
                final,
                vols
            },
            message: "Data Fetched for YEAR: " + year + " ,for ID: " + empId
        });

    }catch(e){
        res.status(500).json({
            success: false,
            data: "Somethin went wrong !",
            message: e
        })
    }
});

module.exports = router;