const express = require('express');
const router = express.Router();

const {onlyAdmin} = require("../middlewares/auth");

const ivmsModel = require("../models/ivms.model");

const professionalSectors = ["Frontend Web Developer", "Backend Web Developer", "FullStack Web Developer", "Graphic Designer", "Linux Administrator", "App Developer", "UI/UX Developer", "Social Worker", "Content Writer", "Digital Marketing Expert", "XML Expert", "UNSDG Expert", "MSW Expert", "MPhil Expert", "Experienced SW", "PHD Expert", "Brand Master Expert", "Administrative Expert", "Subject Matter Expert"];

router.post("/reports-monthly-iv", onlyAdmin, async(req, res) => {
    const {month, year} = req.body;
    try{
        const allIVs = await ivmsModel.find();
        
        let interns = 0; 
        let volunteers = 0;
        let advisors = 0;
        
        if(allIVs.length > 0){
            for(let i = 0; i < allIVs.length; i++){
                if(allIVs[i].startDate.getMonth() === Number(month) && allIVs[i].startDate.getFullYear() === Number(year)){
                    // console.log(allIVs[i].role);
                    if(allIVs[i].role === "Intern"){
                        interns++;
                    } else if(allIVs[i].role === "Volunteer") {
                        volunteers++;
                    } else if(allIVs[i].role === "Advisor"){
                        advisors++;
                    }
                }
            }

            res.status(200).json({
                success: true,
                data: [{
                    label: "Intern",
                    value: interns,
                    color: "#513252"
                },
                {
                   label: "Volunteer",
                   value: volunteers,
                   color: "#293462" 
                },
                {
                    label: "Advisor",
                    value: advisors,
                    color: "#D61C4E" 
                 }    
                ],
                message: `Your Data is ready for month ${month+1} !!`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: `No IVs Found for Month ${month + 1} !!`,
                message: "Please try again for different month !!"
            });
            return -1;
        }

    }catch(e){
        res.status(500).json({
            success: false,
            data: "Gone wrong !",
            message: e
        })
    }
});

router.post("/reports-quarterly-iv", onlyAdmin, async(req, res) => {
    const {quarter, year} = req.body;
    try{
        const allIVs = await ivmsModel.find();

        let interns = 0; 
        let volunteers = 0;
        let advisors = 0;

        if(allIVs.length > 0){
            for(let i = 0; i < allIVs.length; i++){
                if(Number(quarter) === 0){
                    if((allIVs[i].startDate.getMonth() === 0 || allIVs[i].startDate.getMonth() === 1 || allIVs[i].startDate.getMonth() === 2 || allIVs[i].startDate.getMonth() === 3) && allIVs[i].startDate.getFullYear() === Number(year)){
                        if(allIVs[i].role === "Intern"){
                            interns++;
                        } else if(allIVs[i].role === "Volunteer") {
                            volunteers++;
                        } else if(allIVs[i].role === "Advisor"){
                            advisors++;
                        }
                    }
                } else if(Number(quarter) === 1){
                    if((allIVs[i].startDate.getMonth() === 4 || allIVs[i].startDate.getMonth() === 5 || allIVs[i].startDate.getMonth() === 6 || allIVs[i].startDate.getMonth() === 7) && allIVs[i].startDate.getFullYear() === Number(year)){
                        if(allIVs[i].role === "Intern"){
                            interns++;
                        } else if(allIVs[i].role === "Volunteer") {
                            volunteers++;
                        } else if(allIVs[i].role === "Advisor"){
                            advisors++;
                        }
                    }
                } else if(Number(quarter) === 2){
                    if((allIVs[i].startDate.getMonth() === 8 || allIVs[i].startDate.getMonth() === 9 || allIVs[i].startDate.getMonth() === 10 || allIVs[i].startDate.getMonth() === 11) && allIVs[i].startDate.getFullYear() === Number(year)){
                        if(allIVs[i].role === "Intern"){
                            interns++;
                        } else if(allIVs[i].role === "Volunteer") {
                            volunteers++;
                        } else if(allIVs[i].role === "Advisor"){
                            advisors++;
                        }
                    }
                }
            }

            res.status(200).json({
                success: true,
                data: [{
                    label: "Intern",
                    value: interns,
                    color: "#513252"
                },
                {
                   label: "Volunteer",
                   value: volunteers,
                   color: "#293462" 
                },
                {
                    label: "Advisor",
                    value: advisors,
                    color: "#D61C4E" 
                 }    
                ],
                message: `Your Data is ready for Q${Number(quarter)+1} !!`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: `No IVs Found for  Q${Number(quarter) + 1} !!`,
                message: "Please try again for different Quarter !!"
            });
            return -1;
        }

    }catch(e){
        // console.log(e);
        res.status(500).json({
            success: false,
            data: "Gone wrong !",
            message: e
        })
    }
});

router.post("/reports-yearly-iv", onlyAdmin, async(req, res) => {
    const {year} = req.body;
    try{
        const allIVs = await ivmsModel.find();

        let interns = 0; 
        let volunteers = 0;
        let advisors = 0;

        if(allIVs.length > 0){
            for(let i = 0; i < allIVs.length; i++){
                if(allIVs[i].startDate.getFullYear() === Number(year)){
                    if(allIVs[i].role === "Intern"){
                        interns++;
                    } else if(allIVs[i].role === "Volunteer") {
                        volunteers++;
                    } else if(allIVs[i].role === "Advisor"){
                        advisors++;
                    }
                }
            }

            res.status(200).json({
                success: true,
                data: [{
                    label: "Intern",
                    value: interns,
                    color: "#513252"
                },
                {
                   label: "Volunteer",
                   value: volunteers,
                   color: "#293462" 
                },
                {
                    label: "Advisor",
                    value: advisors,
                    color: "#D61C4E" 
                 }    
                ],
                message: `Your Data is ready for YEAR-${Number(year)} !!`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: `No IVs Found for YEAR-${Number(year)} !!`,
                message: "Please try again for different year !!"
            });
            return -1;
        }

    }catch(e){
        res.status(500).json({
            success: false,
            data: "Something went wrong !",
            message: "Something went wrong !"
        })
    }
});

router.post("/reports-monthly-professionalSector", onlyAdmin, async(req, res) => {
    const {month, year} = req.body;
    try{
        // console.log(professionalSectors);
        let dat = {};
        professionalSectors.forEach(sector => {
            dat[sector] = 0;
        });
        
        // console.log(dat);

        const allIVs = await ivmsModel.find();
        
        if(allIVs.length > 0){
            for(let i = 0; i < allIVs.length; i++){
                if(allIVs[i].startDate.getMonth() === Number(month) && allIVs[i].startDate.getFullYear() === Number(year)){
                    if(allIVs[i].professionalSector in dat){
                        dat[allIVs[i].professionalSector] += 1
                    }
                }
            }

            let final = [];
            let colors = ["#395B64", "#A5C9CA", "#D61C4E", "#FEB139", "#CEE5D0", "#1F4690", "#898AA6", "#FFC4C4"];
            let col = 0;

            for(let key in dat){
                if(dat.hasOwnProperty(key)){
                    final.push({
                        label: key,
                        value: dat[key],
                        color: colors[col]
                    });
                    col++;
                }
            }

            res.status(200).json({
                success: true,
                data: final,
                message: `Your data is ready for Month - ${month+1}`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: "No data found for Month - " + (Number(month) + 1),
                message: "Please try for different month"
            });
            return -1;
        }
    }catch(e){
        // console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!"
        })
    }
});

router.post("/reports-quarterly-professionalSector", onlyAdmin, async(req, res) => {
    const {quarter, year} = req.body;
    try{
        // console.log(professionalSectors);
        let dat = {};
        professionalSectors.forEach(sector => {
            dat[sector] = 0;
        });
        const allIVs = await ivmsModel.find();
        
        if(allIVs.length > 0){
            for(let i = 0; i < allIVs.length; i++){
                if((Number(quarter)) === 0){
                    if((allIVs[i].startDate.getMonth() === 0 || allIVs[i].startDate.getMonth() === 1 || allIVs[i].startDate.getMonth() === 2 || allIVs[i].startDate.getMonth() === 3) && allIVs[i].startDate.getFullYear() === Number(year)){
                        // console.log("yes");
                        if(allIVs[i].professionalSector in dat){
                            dat[allIVs[i].professionalSector] += 1
                        }
                    }
                }
                else if((Number(quarter)) === 1){
                    if((allIVs[i].startDate.getMonth() === 4 || allIVs[i].startDate.getMonth() === 5 || allIVs[i].startDate.getMonth() === 6 || allIVs[i].startDate.getMonth() === 7) && allIVs[i].startDate.getFullYear() === Number(year)){
                        if(allIVs[i].professionalSector in dat){
                            dat[allIVs[i].professionalSector] += 1
                        }
                    }
                }
                else if((Number(quarter)) === 2){
                    if((allIVs[i].startDate.getMonth() === 8 || allIVs[i].startDate.getMonth() === 9 || allIVs[i].startDate.getMonth() === 10 || allIVs[i].startDate.getMonth() === 11) && allIVs[i].startDate.getFullYear() === Number(year)){
                        if(allIVs[i].professionalSector in dat){
                            dat[allIVs[i].professionalSector] += 1
                        }
                    }
                }
            }

            let final = [];
            let colors = ["#395B64", "#A5C9CA", "#D61C4E", "#FEB139", "#CEE5D0", "#1F4690", "#898AA6", "#FFC4C4"];
            let col = 0;

            for(let key in dat){
                if(dat.hasOwnProperty(key)){
                    final.push({
                        label: key,
                        value: dat[key],
                        color: colors[col]
                    });
                    col++;
                }
            }

            res.status(200).json({
                success: true,
                data: final,
                message: `Your data is ready for Q${Number(quarter)+1}`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: "No data found for Q" + (Number(quarter) + 1),
                message: "Please try for different quarter"
            });
            return -1;
        }
    }catch(e){
        // console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!"
        })
    }
});

router.post("/reports-yearly-professionalSector", onlyAdmin, async(req, res) => {
    const {year} = req.body;
    try{
        // console.log(professionalSectors);
        let dat = {};
        professionalSectors.forEach(sector => {
            dat[sector] = 0;
        });
        const allIVs = await ivmsModel.find();
        
        if(allIVs.length > 0){
            for(let i = 0; i < allIVs.length; i++){
                if(allIVs[i].startDate.getFullYear() === Number(year)){
                    if(allIVs[i].professionalSector in dat){
                        dat[allIVs[i].professionalSector] += 1
                    }
                }
            }

            let final = [];
            let colors = ["#395B64", "#A5C9CA", "#D61C4E", "#FEB139", "#CEE5D0", "#1F4690", "#898AA6", "#FFC4C4"];
            let col = 0;

            for(let key in dat){
                if(dat.hasOwnProperty(key)){
                    final.push({
                        label: key,
                        value: dat[key],
                        color: colors[col]
                    });
                    col++;
                }
            }

            res.status(200).json({
                success: true,
                data: final,
                message: `Your data is ready for Year - ${year}`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: "No data found for Year - " + year,
                message: "Please try for different Year"
            });
            return -1;
        }
    }catch(e){
        // console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!"
        })
    }
});

module.exports = router;