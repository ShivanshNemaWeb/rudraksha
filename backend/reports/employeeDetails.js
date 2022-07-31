const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const LMS = require("../models/Lms");
const Leaves = require("../models/leaves");
const { authentication, onlyAdmin } = require("../middlewares/auth");
const _ = require("lodash");

router.get("/reports-designation-employee", onlyAdmin, async (req, res) => {
    try {
        let docs = await Employee.aggregate([
            {
                $group: {
                    _id: '$designation',
                    count: { $sum: 1 }
                }
            }
        ])
        let dat = []
        docs.forEach(doc => {
            dat.push({ label: doc._id, value: doc.count })
        });
        res.status(200).json({
            success: true,
            data: dat,
            message: "Your data is ready !!"
        })
        // res.render("bar-chart-1", {
        //     docs: JSON.stringify(docs)
        // })
    } catch (e) {
        // console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!"
        });
    }
});

router.get("/reports-gender-employee", onlyAdmin, async (req, res) => {
    try {
        let docs = await Employee.aggregate([
            {
                $group: {
                    _id: '$gender',
                    count: { $sum: 1 }
                }
            }
        ]);

        let dat = []
        docs.forEach(doc => {
            dat.push({ label: doc._id, value: doc.count })
        });

        // console.log(dat);

        res.status(200).json({
            success: true,
            data: dat,
            message: "Your data is ready !!"
        })

    } catch (e) {
        // console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!"
        });
    }
});

// how many leaves are taken by a specific employee
router.post("/report-leaves-employee", onlyAdmin, async (req, res, next) => {
    const { empId } = req.body;
    try {

        // const emps = await Employee.find({
        //     "$expr": {
        //       "$regexMatch": {
        //         "input": { "$concat": ["$firstname", " ","$lastname"] },
        //         "regex": name,  //Your text search here
        //         "options": "i"
        //       }
        //     }
        // })

        // const emps = await Employee.find({
        //     "$or": [
        //         {firstname: {$regex: name}},
        //         {middlename: {$regex: name}},
        //         {lastname: {$regex: name}},
        //     ]
        // });

        const employee = await Employee.findOne({ _id: empId })

        if (employee) {
            // console.log("exists");
            const lmsOfEMP = await LMS.findOne({ empId: employee._id });
            // console.log(lmsOfEMP);
            let allData;
            if (lmsOfEMP) {
                if (employee.gender === "F") {
                    // labels = ["CL", "SL", "EL", "SPL", "MAT_L", "MOU_L", "EMG_L"];
                    // data = [lmsOfEMP.casualLeaveDays, lmsOfEMP.sickLeaveDays, lmsOfEMP.earnedLeaveDays, lmsOfEMP.specialLeaveDays, lmsOfEMP.maternityLeaveDays, lmsOfEMP.mourningLeaveDays, lmsOfEMP.emergencyLeaveDays];
                    const backgroundColor = [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(130, 115, 151, 0.2)',
                        'rgba(146, 180, 236, 0.2)',
                        'rgba(249, 206, 238, 0.2)'
                    ]
                    allData = [
                        {
                            label: "CL",
                            value: lmsOfEMP.casualLeaveDays,
                            color: 'rgba(255, 99, 132, 0.2)'
                        },
                        {
                            label: "SL",
                            value: lmsOfEMP.sickLeaveDays,
                            color: 'rgba(54, 162, 235, 0.2)'
                        },
                        {
                            label: "EL",
                            value: lmsOfEMP.earnedLeaveDays,
                            color: 'rgba(255, 206, 86, 0.2)'
                        },
                        {
                            label: "SPL",
                            value: lmsOfEMP.specialLeaveDays,
                            color: 'rgba(75, 192, 192, 0.2)'
                        },
                        {
                            label: "ML",
                            value: lmsOfEMP.maternityLeaveDays,
                            color: 'rgba(153, 102, 255, 0.2)'
                        },
                        {
                            label: "MRL",
                            value: lmsOfEMP.mourningLeaveDays,
                            color: 'rgba(249, 206, 238, 0.2)'
                        },
                        {
                            label: "EML",
                            value: lmsOfEMP.emergencyLeaveDays,
                            color: 'rgba(255, 159, 64, 0.2)'
                        },

                    ]

                    // console.log(allData);

                } else if (employee.gender === "M") {

                    allData = [
                        {
                            label: "CL",
                            value: lmsOfEMP.casualLeaveDays,
                            color: 'rgba(255, 99, 132, 0.2)'
                        },
                        {
                            label: "SL",
                            value: lmsOfEMP.sickLeaveDays,
                            color: 'rgba(54, 162, 235, 0.2)'
                        },
                        {
                            label: "EL",
                            value: lmsOfEMP.earnedLeaveDays,
                            color: 'rgba(255, 206, 86, 0.2)'
                        },
                        {
                            label: "SPL",
                            value: lmsOfEMP.specialLeaveDays,
                            color: 'rgba(75, 192, 192, 0.2)'
                        },
                        {
                            label: "PL",
                            value: lmsOfEMP.paternityLeaveDays,
                            color: 'rgba(153, 102, 255, 0.2)'
                        },
                        {
                            label: "MRL",
                            value: lmsOfEMP.mourningLeaveDays,
                            color: 'rgba(249, 206, 238, 0.2)'
                        },
                        {
                            label: "EML",
                            value: lmsOfEMP.emergencyLeaveDays,
                            color: 'rgba(255, 159, 64, 0.2)'
                        },

                    ]

                    // console.log(allData);
                }
            } else {
                res.status(400).json({
                    success: false,
                    data: `No LMS Found for Employee ID: ${empId}`,
                    message: `Try With Different Name !!`
                })
                return -1;
            }

            res.status(200).json({
                success: true,
                data: allData,
                message: `Your data is ready for '${employee.firstname} ${employee.middlename} ${employee.lastname}'!!`
            })
        } else {
            console.log("noo");
            res.status(400).json({
                success: false,
                data: `No Employee found with Name: ${firstname}`,
                message: `Try With lastname/middlename/firstname !!`
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            data: e,
            message: "Something went wrong !!"
        });
    }
});

// Monthly
// All Employees
router.post("/reports-monthly-allEmployees", async (req, res) => {
    const { month } = req.body;
    try {
        const lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved" });
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if (leaves[j].from.getMonth() === month) {
                    if (leaves[j].typeOfLeave === "casual leave") {
                        lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "sick leave") {
                        lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "compensatory leave") {
                        lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "earned leave") {
                        lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "special leave") {
                        lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "maternity leave") {
                        lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "paternity leave") {
                        lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "mourning leave") {
                        lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "emergency leave") {
                        lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: `All Leaves taken in a month of ${Number(month) + 1} fetched !!`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: "No Leaves found !!",
                message: "Please try again later !!"
            });
            return -1;
        }
    } catch (e) {

    }
});

// Particular Employee
router.post("/reports-employee-monthly", async (req, res) => {
    const { month, empId } = req.body;
    try {
        const leaves = await Leaves.find({ status: "Approved", empId });
        let lvs = {
            "casual leave": 0,
            "sick leave": 0,
            "earned leave": 0,
            "compensatory leave": 0,
            "special leave": 0,
            "maternity leave": 0,
            "paternity leave": 0,
            "mourning leave": 0,
            "emergency leave": 0,

        };
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if (leaves[j].from.getMonth() === month) {
                    if (leaves[j].typeOfLeave === "casual leave") {
                        lvs["casual leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "sick leave") {
                        lvs["sick leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "compensatory leave") {
                        lvs["compensatory leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "earned leave") {
                        lvs["earned leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "special leave") {
                        lvs["special leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "maternity leave") {
                        lvs["maternity leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "paternity leave") {
                        lvs["paternity leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "mourning leave") {
                        lvs["mourning leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "emergency leave") {
                        lvs["emergency leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                }
            }
        } else {
            res.status(500).json({
                success: false,
                data: "No Leaves found for EMP ID: " + empId,
                message: "Try for Different EMP ID !!"
            })
            return -1;
        }

        let dat = [
            {
                label: "CL",
                value: lvs["casual leave"],
                color: '#ff6384',
            },
            {
                label: "SL",
                value: lvs["sick leave"],
                color: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: "EL",
                value: lvs["earned leave"],
                color: 'rgba(255, 206, 86, 0.2)',
            },
            {
                label: "CML",
                value: lvs["compensatory leave"],
                color: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: "SPL",
                value: lvs["special leave"],
                color: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: "ML",
                value: lvs["maternity leave"],
                color: 'rgba(255, 159, 64, 0.2)',
            },
            {
                label: "PL",
                value: lvs["paternity leave"],
                color: 'rgba(130, 115, 151, 0.2)',
            },
            {
                label: "MRL",
                value: lvs["mourning leave"],
                color: 'rgba(146, 180, 236, 0.2)',
            },
            {
                label: "EML",
                value: lvs["emergency leave"],
                color: 'rgba(249, 206, 238, 0.2)'
            }
        ]
        res.status(200).json({
            success: true,
            data: dat,
            message: "Data fetched for EMP ID: " + empId + " for month: " + (Number(month) + 1)
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        })
    }
});


// Quarterly
// All Employees
router.post("/reports-quarterly-allEmployees", async (req, res) => {
    const { quarter } = req.body;
    try {
        let lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved" });
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if (Number(quarter) === 0) {
                    if (leaves[j].from.getMonth() === 0 || leaves[j].from.getMonth() === 1 || leaves[j].from.getMonth() === 2 || leaves[j].from.getMonth() === 3) {
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
                else if (Number(quarter) === 1) {
                    if (leaves[j].from.getMonth() === 4 || leaves[j].from.getMonth() === 5 || leaves[j].from.getMonth() === 6 || leaves[j].from.getMonth() === 7) {
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
                else if (Number(quarter) === 2) {
                    if (leaves[j].from.getMonth() === 8 || leaves[j].from.getMonth() === 9 || leaves[j].from.getMonth() === 10 || leaves[j].from.getMonth() === 11) {
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: "Fetched All Leaves of Employees in Q"+(Number(quarter)+1)
            });
            return -1;
        } else {
            res.status(400).json({
                success: true,
                data: "No Leaves found !!",
                message: "Please try again later !!"
            });
            return -1;
        }
        }catch (e) {
            res.status(500).json({
                success: false,
                data: "Something Went Wrong !!",
                message: "Something Went Wrong !!"
            });
        }
});

// Particular Employee
router.post("/reports-employee-quarterly", async (req, res) => {
    // if(leaves[i].from.getMonth() === 0 || leaves[i].from.getMonth() === 1 || leaves[i].from.getMonth() === 2 || leaves[i].from.getMonth() === 3)
    const { quarter, empId } = req.body;
    try {
        let lvs = {
            "casual leave": 0,
            "sick leave": 0,
            "earned leave": 0,
            "compensatory leave": 0,
            "special leave": 0,
            "maternity leave": 0,
            "paternity leave": 0,
            "mourning leave": 0,
            "emergency leave": 0,

        };
        const leaves = await Leaves.find({ status: "Approved", empId });
        // console.log(leaves);
        if (leaves.length !== 0) {
            // console.log("yes");
            for (let j = 0; j < leaves.length; j++) {
                if (Number(quarter) === 1) {
                    if (leaves[j].from.getMonth() === 4 || leaves[j].from.getMonth() === 5 || leaves[j].from.getMonth() === 6 || leaves[j].from.getMonth() === 7) {
                        // console.log(leaves[j]);
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs["casual leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs["sick leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs["compensatory leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs["earned leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs["special leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs["maternity leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs["paternity leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs["mourning leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs["emergency leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
                else if (Number(quarter) === 0) {
                    if (leaves[j].from.getMonth() === 0 || leaves[j].from.getMonth() === 1 || leaves[j].from.getMonth() === 2 || leaves[j].from.getMonth() === 3) {
                        // console.log(leaves[j]);
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs["casual leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs["sick leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs["compensatory leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs["earned leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs["special leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs["maternity leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs["paternity leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs["mourning leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs["emergency leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
                else if (Number(quarter) === 2) {
                    if (leaves[j].from.getMonth() === 8 || leaves[j].from.getMonth() === 9 || leaves[j].from.getMonth() === 10 || leaves[j].from.getMonth() === 11) {
                        // console.log(leaves[j]);
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs["casual leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs["sick leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs["compensatory leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs["earned leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs["special leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs["maternity leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs["paternity leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs["mourning leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs["emergency leave"] += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs["casual leave"],
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs["sick leave"],
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs["earned leave"],
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs["compensatory leave"],
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs["special leave"],
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs["maternity leave"],
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs["paternity leave"],
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs["mourning leave"],
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs["emergency leave"],
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            // console.log(dat);
            res.status(200).json({
                success: true,
                data: dat,
                message: `Leaves taken fetched for EMP ID: ${empId} for Quarter: Q${Number(quarter) + 1}`
            });
            return -1;
        }
        else {
            res.status(400).json({
                success: false,
                data: "No Leaves found for EMP ID: " + empId,
                message: `Cannot GET the leaves for EMP ID, Try with different EMP ID !!`
            });
            return -1;
        }
    } catch (e) {
        // console.log(e);
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

// Half Yearly
// All Employees
router.post("/reports-halfYearly-allEmployees", async(req, res) => {
    const {half} = req.body;
    try{
        let lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved" });
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if (Number(half) === 0) {
                    if (leaves[j].from.getMonth() === 0 || leaves[j].from.getMonth() === 1 || leaves[j].from.getMonth() === 2 || leaves[j].from.getMonth() === 3 || leaves[j].from.getMonth() === 4 || leaves[j].from.getMonth() === 5) {
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
                else if (Number(half) === 1) {
                    if (leaves[j].from.getMonth() === 9 || leaves[j].from.getMonth() === 8 || leaves[j].from.getMonth() === 6 || leaves[j].from.getMonth() === 7 || leaves[j].from.getMonth() === 10 || leaves[j].from.getMonth() === 11) {
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            
            res.status(200).json({
                success: true,
                data: dat,
                message: "Fetched All Leaves of Employees in HY-"+(Number(half)+1)
            });
            return -1;
        } else {
            res.status(400).json({
                success: true,
                data: "No Leaves found !!",
                message: "Please try again later !!"
            });
            return -1;
        }
    }catch(e){
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

// Particular Employee
router.post("/reports-employee-halfYearly", async(req, res) => {
    const {empId, half} = req.body;
    try{
        let lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved", empId });
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if (Number(half) === 0) {
                    if (leaves[j].from.getMonth() === 0 || leaves[j].from.getMonth() === 1 || leaves[j].from.getMonth() === 2 || leaves[j].from.getMonth() === 3 || leaves[j].from.getMonth() === 4 || leaves[j].from.getMonth() === 5) {
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
                else if (Number(half) === 1) {
                    if (leaves[j].from.getMonth() === 9 || leaves[j].from.getMonth() === 8 || leaves[j].from.getMonth() === 6 || leaves[j].from.getMonth() === 7 || leaves[j].from.getMonth() === 10 || leaves[j].from.getMonth() === 11) {
                        if (leaves[j].typeOfLeave === "casual leave") {
                            lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "sick leave") {
                            lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "compensatory leave") {
                            lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "earned leave") {
                            lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "special leave") {
                            lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "maternity leave") {
                            lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "paternity leave") {
                            lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "mourning leave") {
                            lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                        else if (leaves[j].typeOfLeave === "emergency leave") {
                            lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                        }
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: "Fetched Leaves taken for EMP ID: " + empId + " in HY-"+(Number(half)+1)
            });
            return -1;
        } else {
            res.status(400).json({
                success: true,
                data: "No Leaves found !!",
                message: "Please try again later !!"
            });
            return -1;
        }
    }catch(e){
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

// Yearly
// All Employees
router.post("/reports-yearly-allEmployees", async(req, res) => {
    const {year} = req.body;
    // const dt = new Date()
    // dt.getFullYear
    try{
        let lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved" });
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if(leaves[j].from.getFullYear() == year){
                    if (leaves[j].typeOfLeave === "casual leave") {
                        lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "sick leave") {
                        lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "compensatory leave") {
                        lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "earned leave") {
                        lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "special leave") {
                        lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "maternity leave") {
                        lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "paternity leave") {
                        lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "mourning leave") {
                        lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "emergency leave") {
                        lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: "Fetched All Leaves of Employees for Y-"+(Number(year))
            });
            return -1;
        } else {
            res.status(400).json({
                success: true,
                data: "No Leaves found !!",
                message: "Please try again later !!"
            });
            return -1;
        }
    }catch(e){
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});

// Particular Employee
router.post("/reports-yearly-allEmployees", async(req, res) => {
    const {year, empId} = req.body;
    // const dt = new Date()
    // dt.getFullYear
    try{
        let lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved", empId });
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if(leaves[j].from.getFullYear() === year){
                    if (leaves[j].typeOfLeave === "casual leave") {
                        lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "sick leave") {
                        lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "compensatory leave") {
                        lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "earned leave") {
                        lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "special leave") {
                        lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "maternity leave") {
                        lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "paternity leave") {
                        lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "mourning leave") {
                        lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "emergency leave") {
                        lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: "Fetched All Leaves of Employees for Y-"+(Number(year))
            });
            return -1;
        } else {
            res.status(400).json({
                success: true,
                data: "No Leaves found !!",
                message: "Please try again later !!"
            });
            return -1;
        }
    }catch(e){
        res.status(500).json({
            success: false,
            data: "Something Went Wrong !!",
            message: "Something Went Wrong !!"
        });
    }
});


// Weekly
// All Employees
router.post("/reports-weekly-allEmployees", async(req, res) => {
    // YYYY-MM-DD
    const {start} = req.body;
    const startDate = new Date(start);
    const end = (7*1000*3600*24) + startDate.getTime();
    const endDate = new Date(end);
    
    try{

        const lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved" });
        
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if ((leaves[j].from.getTime() > startDate.getTime()) && (leaves[j].from.getTime() < end)) {
                    if (leaves[j].typeOfLeave === "casual leave") {
                        lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "sick leave") {
                        lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "compensatory leave") {
                        lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "earned leave") {
                        lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "special leave") {
                        lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "maternity leave") {
                        lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "paternity leave") {
                        lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "mourning leave") {
                        lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "emergency leave") {
                        lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: `All Leaves taken from '${startDate.toDateString()}' to '${endDate.toDateString()}' !!`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: "No Leaves found !!",
                message: "Please try again later !!"
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

// Particular Employee
router.post("/reports-employee-weekly", async(req, res) => {
    // YYYY-MM-DD
    const {start, empId} = req.body;
    const startDate = new Date(start);
    const end = (7*1000*3600*24) + startDate.getTime();
    const endDate = new Date(end);
    
    try{

        const lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved", empId });
        
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if ((leaves[j].from.getTime() > startDate.getTime()) && (leaves[j].from.getTime() < end)) {
                    console.log("Yes");
                    if (leaves[j].typeOfLeave === "casual leave") {
                        lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "sick leave") {
                        lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "compensatory leave") {
                        lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "earned leave") {
                        lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "special leave") {
                        lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "maternity leave") {
                        lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "paternity leave") {
                        lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "mourning leave") {
                        lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "emergency leave") {
                        lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: `All Leaves taken from '${startDate.toDateString()}' to '${endDate.toDateString()}' !!`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: "No Leaves found !!",
                message: "Please try again later !!"
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


// For some 14 days
// All Employees
router.post("/reports-14-allEmployees", async(req, res) => {
    // YYYY-MM-DD
    const {start} = req.body;
    const startDate = new Date(start);
    const end = (14*1000*3600*24) + startDate.getTime();
    const endDate = new Date(end);
    
    try{

        const lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved" });
        
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if ((leaves[j].from.getTime() > startDate.getTime()) && (leaves[j].from.getTime() < end)) {
                    if (leaves[j].typeOfLeave === "casual leave") {
                        lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "sick leave") {
                        lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "compensatory leave") {
                        lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "earned leave") {
                        lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "special leave") {
                        lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "maternity leave") {
                        lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "paternity leave") {
                        lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "mourning leave") {
                        lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "emergency leave") {
                        lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: `All Leaves taken from '${startDate.toDateString()}' to '${endDate.toDateString()}' !!`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: "No Leaves found !!",
                message: "Please try again later !!"
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

// Particular Employee
router.post("/reports-employee-14", async(req, res) => {
    // YYYY-MM-DD
    const {start, empId} = req.body;
    const startDate = new Date(start);
    const end = (14*1000*3600*24) + startDate.getTime();
    const endDate = new Date(end);
    
    try{

        const lvs = {
            "CL": 0,
            "SL": 0,
            "EL": 0,
            "COMP_L": 0,
            "SPL_L": 0,
            "MAT_L": 0,
            "PAT_L": 0,
            "MOURN_L": 0,
            "EMG_L": 0,
        }
        const leaves = await Leaves.find({ status: "Approved", empId });
        
        if (leaves.length !== 0) {
            for (let j = 0; j < leaves.length; j++) {
                if ((leaves[j].from.getTime() > startDate.getTime()) && (leaves[j].from.getTime() < end)) {
                    if (leaves[j].typeOfLeave === "casual leave") {
                        lvs.CL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "sick leave") {
                        lvs.SL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "compensatory leave") {
                        lvs.COMP_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "earned leave") {
                        lvs.EL += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "special leave") {
                        lvs.SPL_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "maternity leave") {
                        lvs.MAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "paternity leave") {
                        lvs.PAT_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "mourning leave") {
                        lvs.MOURN_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                    else if (leaves[j].typeOfLeave === "emergency leave") {
                        lvs.EMG_L += (leaves[j].to - leaves[j].from) / (1000 * 3600 * 24);
                    }
                }
            }
            let dat = [
                {
                    label: "CL",
                    value: lvs.CL,
                    color: '#ff6384',
                },
                {
                    label: "SL",
                    value: lvs.SL,
                    color: 'rgba(54, 162, 235, 0.2)',
                },
                {
                    label: "EL",
                    value: lvs.EL,
                    color: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: "CML",
                    value: lvs.COMP_L,
                    color: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: "SPL",
                    value: lvs.SPL_L,
                    color: 'rgba(153, 102, 255, 0.2)',
                },
                {
                    label: "ML",
                    value: lvs.MAT_L,
                    color: 'rgba(255, 159, 64, 0.2)',
                },
                {
                    label: "PL",
                    value: lvs.PAT_L,
                    color: 'rgba(130, 115, 151, 0.2)',
                },
                {
                    label: "MRL",
                    value: lvs.MOURN_L,
                    color: 'rgba(146, 180, 236, 0.2)',
                },
                {
                    label: "EML",
                    value: lvs.EMG_L,
                    color: 'rgba(249, 206, 238, 0.2)'
                }
            ];
            res.status(200).json({
                success: true,
                data: dat,
                message: `All Leaves taken from '${startDate.toDateString()}' to '${endDate.toDateString()}' !!`
            });
            return -1;
        } else {
            res.status(400).json({
                success: false,
                data: "No Leaves found !!",
                message: "Please try again later !!"
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