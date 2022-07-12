const express = require('express');
const router = express.Router();
const Admin = require("../models/Admin_Rudraksha.model");
const Director = require("../models/Director_Rudraksha.model");
const Employee = require("../models/employee");
const {onlyAdmin} = require("../middlewares/auth")

router.post("/createAdmin", onlyAdmin, async(req, res) => {
    const {empId} = req.body;
    try {
        const emp = await Employee.findOne({_id: empId});
        const admin = await Admin.findOne({empId});

        if(emp){
            if(!admin){
                const newAdmin = new Admin({
                    empId,
                    email: emp.email,
                    fullName: emp.firstname + " " + emp.middlename + " " + emp.lastname
                });
                const saveAdmin = await newAdmin.save();
                res.status(201).json({
                    success: true,
                    data: saveAdmin,
                    message: "Admin Created !!"
                })
            } else {
                res.status(400).json({
                    success: false,
                    data: "Admin Already exists",
                    message: "Try Adding another"
                })
            }
        } else {
            res.status(400).json({
                success: false,
                data: `No Employee Found with ID: ${empId}`,
                message: "Wrong Employee ID !!"
            })
        }
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong",
            message: "Something went wrong"
        })
    }
});

router.post("/makeDirector", onlyAdmin, async(req, res) => {
    const {empId} = req.body;
    try{
        const emp = await Employee.findOne({_id: empId});
        const director = await Director.findOne({empId});

        if(emp){
            if(!director){
                const newDirector = new Director({
                    empId,
                    email: emp.email,
                    fullName: emp.firstname + " " + emp.middlename + " " + emp.lastname
                });
                const saveDirector = await newDirector.save();
                res.status(201).json({
                    success: true,
                    data: saveDirector,
                    message: "Director Created !!"
                });
            } else {
                res.status(400).json({
                    success: false,
                    data: "Admin Already exists",
                    message: "Try Adding another"
                })
            }
        } else {
            res.status(400).json({
                success: false,
                data: `No Employee Found with ID: ${empId}`,
                message: "Wrong Employee ID !!"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong",
            message: "Something went wrong"
        })
    }
})

router.get("/priviliged", onlyAdmin, (req, res) => {
    // console.log(req.emp);
    res.send("Hello MF")
})

module.exports = router;