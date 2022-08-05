const express = require("express");
const router = express.Router();

// AUTH MIDDLEWARE
const { authentication, onlyAdmin } = require("../middlewares/auth");

// ALL MODELS
const memo = require("../models/memo.model");
const nmsEmp = require("../models/nms-empTrack.model");
const nmsVol = require("../models/nms-volunteers.model");
const digital = require("../models/salesDIGITAL.model");
const fncg = require("../models/salesFNCG.model");
//-------------------------------------------------------

router.post("/pms-monthly", async (req, res) => {
    const { empId, month, year } = req.body;
    try {
        const recruiter = await nmsEmp.findOne({ empId });
        const allVols = await nmsVol.find({ empId });
        const digitalSales = await digital.findOne({ empId });
        const fncgSales = await fncg.findOne({ empId });
        const memoIssue = await memo.findOne({ empId });

        let count = {
            NMS_COUNT: 0, //
            DONATION_YET: 0, //
            DIG_SALES: 0,
            FNCG_SALES: 0,
            MEMO_COUNT: 0,
        };

        let total = {
            TOTAL_NMS_COUNT: 21,
            DONATION_TARGET: 2100,
            TOTAL_DIG_SALES: 15000,
            TOTAL_FNCG_SALES: 3000,
        };

        // No. of Volunteers added by an Employee (Updated after current month ends)
        if (recruiter) {
            for (let i = 0; i < recruiter.monthlyStatus.length; i++) {
                if (
                    recruiter.monthlyStatus[i].for.getMonth() === Number(month) &&
                    recruiter.monthlyStatus[i].for.getFullYear() === Number(year)
                ) {
                    count.NMS_COUNT = recruiter.monthlyStatus[i].count;
                }
            }
        }

        // Total Donation done by the Volunteers brought by our Employee
        if (allVols.length > 0) {
            for (let i = 0; i < allVols.length; i++) {
                for (let j = 0; j < allVols[i].donationStatus.length; j++) {
                    if (
                        allVols[i].donationStatus[j].for.getMonth() === Number(month) &&
                        allVols[i].donationStatus[j].for.getFullYear() === Number(year)
                    ) {
                        count.DONATION_YET += allVols[i].donationStatus[j].amount;
                    }
                }
            }
        }

        // Total Digital Sales done by our Employee
        if (digitalSales) {
            for (let i = 0; i < digitalSales.saleStatus.length; i++) {
                if (
                    digitalSales.saleStatus[i].for.getMonth() === Number(month) &&
                    digitalSales.saleStatus[i].for.getFullYear() === Number(year)
                ) {
                    count.DIG_SALES += digitalSales.saleStatus[i].amount;
                }
            }
        }

        // Total FNCG Sales done by our Employee
        if (fncgSales) {
            for (let i = 0; i < fncgSales.saleStatus.length; i++) {
                if (
                    fncgSales.saleStatus[i].for.getMonth() === Number(month) &&
                    fncgSales.saleStatus[i].for.getFullYear() === Number(year)
                ) {
                    count.FNCG_SALES += fncgSales.saleStatus[i].amount;
                }
            }
        }

        // Total Memo Issued on an Employee by Admin or Director
        if (memoIssue) {
            for (let i = 0; i < memoIssue.memoStatus.length; i++) {
                if (
                    memoIssue.memoStatus[i].for.getMonth() === Number(month) &&
                    memoIssue.memoStatus[i].for.getFullYear() === Number(year)
                ) {
                    count.MEMO_COUNT += 1;
                }
            }
        }

        let percentage = {
            NMS_COUNT_P: (count.NMS_COUNT / total.TOTAL_NMS_COUNT) * 100,
            DONATION_P: (count.DONATION_YET / total.DONATION_TARGET) * 100,
            DIG_P: (count.DIG_SALES / total.TOTAL_DIG_SALES) * 100,
            FNCG_P: (count.FNCG_SALES / total.TOTAL_FNCG_SALES) * 100,
            MEMO_P: 0,
        };

        let grades = {
            NMS_COUNT_P: null,
            DONATION_P: null,
            DIG_P: null,
            FNCG_P: null,
            MEMO_P: null,
        };

        for (let key in percentage) {
            if (percentage.hasOwnProperty(key)) {
                if (percentage[key] >= 150) {
                    grades[key] = "A++";
                } else if (percentage[key] >= 125 && percentage[key] < 150) {
                    grades[key] = "A+";
                } else if (percentage[key] >= 100 && percentage[key] < 125) {
                    grades[key] = "A";
                } else if (percentage[key] >= 90 && percentage[key] < 100) {
                    grades[key] = "B";
                } else if (percentage[key] >= 80 && percentage[key] < 90) {
                    grades[key] = "C";
                } else {
                    grades[key] = "D";
                }
            }
        }

        if (count.MEMO_COUNT === 0) {
            percentage.MEMO_P = 100.0;
            grades.MEMO = "A";
        } else if (count.MEMO_COUNT === 1) {
            percentage.MEMO_P = 80.0;
            grades.MEMO = "B";
        } else if (count.MEMO_COUNT === 2) {
            percentage.MEMO_P = 60.0;
            grades.MEMO = "C";
        } else {
            percentage.MEMO_P = 33.33;
            grades.MEMO = "D";
        }

        let graphical = [
            {
                label: "Network",
                value: percentage.NMS_COUNT_P,
                color: "#D61C4E",
            },
            {
                label: "FNCG",
                value: percentage.FNCG_P,
                color: "#FEB139",
            },
            {
                label: "Digital",
                value: percentage.DIG_P,
                color: "#CEE5D0"
            },
            {
                label: "Donation",
                value: percentage.DONATION_P,
                color: "#FFC4C4"
            },
            {
                label: "Behaviour",
                value: percentage.MEMO_P,
                color: "#1F4690"
            },
        ];

        let target_achieved = [
            {
                label: "Network",
                target: total.TOTAL_NMS_COUNT,
                achieved: count.NMS_COUNT,
            },
            {
                label: "FNCG",
                target: total.TOTAL_FNCG_SALES,
                achieved: count.FNCG_SALES,
            },
            {
                label: "Digital",
                target: total.TOTAL_DIG_SALES,
                achieved: count.DIG_SALES,
            },
            {
                label: "Donation",
                target: total.DONATION_TARGET,
                achieved: count.DONATION_YET,
            },
            {
                label: "Behaviour",
                count: count.MEMO_COUNT
            },
        ];

        res.status(200).json({
            success: true,
            data: { graphical, target_achieved, grades },
            message: "Fetched for Month - " + (Number(month) + 1),
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!",
        });
    }
});

router.post("/pms-quarterly", async (req, res) => {
    const { empId, quarter, year } = req.body;
    try {
        const recruiter = await nmsEmp.findOne({ empId });
        const allVols = await nmsVol.find({ empId });
        const digitalSales = await digital.findOne({ empId });
        const fncgSales = await fncg.findOne({ empId });
        const memoIssue = await memo.findOne({ empId });

        let count = {
            NMS_COUNT: 0, //
            DONATION_YET: 0, //
            DIG_SALES: 0,
            FNCG_SALES: 0,
            MEMO_COUNT: 0,
        };

        let total = {
            TOTAL_NMS_COUNT: 21*4,
            DONATION_TARGET: 2100*4,
            TOTAL_DIG_SALES: 15000*4,
            TOTAL_FNCG_SALES: 3000*4,
        };

        // No. of Volunteers added by an Employee (Updated after current month ends)
        if (recruiter) {
            for (let i = 0; i < recruiter.monthlyStatus.length; i++) {
                if (Number(quarter) === 0) {
                    if (
                        (recruiter.monthlyStatus[i].for.getMonth() === 0 || recruiter.monthlyStatus[i].for.getMonth() === 1 || recruiter.monthlyStatus[i].for.getMonth() === 2 || recruiter.monthlyStatus[i].for.getMonth() === 3) &&
                        recruiter.monthlyStatus[i].for.getFullYear() === Number(year)
                    ) {
                        count.NMS_COUNT = recruiter.monthlyStatus[i].count;
                    }
                } else if (Number(quarter) === 1) {
                    if (
                        (recruiter.monthlyStatus[i].for.getMonth() === 4 || recruiter.monthlyStatus[i].for.getMonth() === 5 || recruiter.monthlyStatus[i].for.getMonth() === 6 || recruiter.monthlyStatus[i].for.getMonth() === 7) &&
                        recruiter.monthlyStatus[i].for.getFullYear() === Number(year)
                    ) {
                        count.NMS_COUNT = recruiter.monthlyStatus[i].count;
                    }
                } else if (Number(quarter) === 2) {
                    if (
                        (recruiter.monthlyStatus[i].for.getMonth() === 8 || recruiter.monthlyStatus[i].for.getMonth() === 9 || recruiter.monthlyStatus[i].for.getMonth() === 10 || recruiter.monthlyStatus[i].for.getMonth() === 11) &&
                        recruiter.monthlyStatus[i].for.getFullYear() === Number(year)
                    ) {
                        count.NMS_COUNT = recruiter.monthlyStatus[i].count;
                    }
                }
            }
        }

        // Total Donation done by the Volunteers brought by our Employee
        if (allVols.length > 0) {
            for (let i = 0; i < allVols.length; i++) {
                for (let j = 0; j < allVols[i].donationStatus.length; j++) {
                    if(Number(quarter) === 0){
                        if ((allVols[i].donationStatus[j].for.getMonth() === 0 || allVols[i].donationStatus[j].for.getMonth() === 1 || allVols[i].donationStatus[j].for.getMonth() === 2 || allVols[i].donationStatus[j].for.getMonth() === 3) &&
                            allVols[i].donationStatus[j].for.getFullYear() === Number(year)
                        ) {
                            count.DONATION_YET += allVols[i].donationStatus[j].amount;
                        }
                    } else if(Number(quarter) === 1){
                        if ((allVols[i].donationStatus[j].for.getMonth() === 4 || allVols[i].donationStatus[j].for.getMonth() === 5 || allVols[i].donationStatus[j].for.getMonth() === 6 || allVols[i].donationStatus[j].for.getMonth() === 7) &&
                            allVols[i].donationStatus[j].for.getFullYear() === Number(year)
                        ) {
                            count.DONATION_YET += allVols[i].donationStatus[j].amount;
                        }
                    } else if(Number(quarter) === 2){
                        if ((allVols[i].donationStatus[j].for.getMonth() === 8 || allVols[i].donationStatus[j].for.getMonth() === 9 || allVols[i].donationStatus[j].for.getMonth() === 10 || allVols[i].donationStatus[j].for.getMonth() === 11) &&
                            allVols[i].donationStatus[j].for.getFullYear() === Number(year)
                        ) {
                            count.DONATION_YET += allVols[i].donationStatus[j].amount;
                        }
                    }
                }
            }
        }

        // Total Digital Sales done by our Employee
        if (digitalSales) {
            for (let i = 0; i < digitalSales.saleStatus.length; i++) {
                if(Number(quarter) === 0){
                    if ((digitalSales.saleStatus[i].for.getMonth() === 0 || digitalSales.saleStatus[i].for.getMonth() === 1 || digitalSales.saleStatus[i].for.getMonth() === 2 || digitalSales.saleStatus[i].for.getMonth() === 3) && digitalSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.DIG_SALES += digitalSales.saleStatus[i].amount;
                    }
                } else if(Number(quarter) === 1){
                    if ((digitalSales.saleStatus[i].for.getMonth() === 4 || digitalSales.saleStatus[i].for.getMonth() === 5 || digitalSales.saleStatus[i].for.getMonth() === 6 || digitalSales.saleStatus[i].for.getMonth() === 7) && digitalSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.DIG_SALES += digitalSales.saleStatus[i].amount;
                    }
                } else if(Number(quarter) === 2){
                    if ((digitalSales.saleStatus[i].for.getMonth() === 8 || digitalSales.saleStatus[i].for.getMonth() === 9 || digitalSales.saleStatus[i].for.getMonth() === 10 || digitalSales.saleStatus[i].for.getMonth() === 11) && digitalSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.DIG_SALES += digitalSales.saleStatus[i].amount;
                    }
                }
            }
        }

        // Total FNCG Sales done by our Employee
        if (fncgSales) {
            for (let i = 0; i < fncgSales.saleStatus.length; i++) {
                if(Number(quarter) === 0){
                    if ((fncgSales.saleStatus[i].for.getMonth() === 0 || fncgSales.saleStatus[i].for.getMonth() === 1 || fncgSales.saleStatus[i].for.getMonth() === 2 || fncgSales.saleStatus[i].for.getMonth() === 3) &&fncgSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.FNCG_SALES += fncgSales.saleStatus[i].amount;
                    }
                } else if(Number(quarter) === 1){
                    if ((fncgSales.saleStatus[i].for.getMonth() === 4 || fncgSales.saleStatus[i].for.getMonth() === 5 || fncgSales.saleStatus[i].for.getMonth() === 6 || fncgSales.saleStatus[i].for.getMonth() === 7) &&fncgSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.FNCG_SALES += fncgSales.saleStatus[i].amount;
                    }
                } else if(Number(quarter) === 2){
                    if ((fncgSales.saleStatus[i].for.getMonth() === 8 || fncgSales.saleStatus[i].for.getMonth() === 9 || fncgSales.saleStatus[i].for.getMonth() === 10 || fncgSales.saleStatus[i].for.getMonth() === 11) &&fncgSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.FNCG_SALES += fncgSales.saleStatus[i].amount;
                    }
                }
            }
        }

        // Total Memo Issued on an Employee by Admin or Director
        if (memoIssue) {
            for (let i = 0; i < memoIssue.memoStatus.length; i++) {
                if(Number(quarter) === 0){
                    if ((memoIssue.memoStatus[i].for.getMonth() === 0 || memoIssue.memoStatus[i].for.getMonth() === 1 || memoIssue.memoStatus[i].for.getMonth() === 2 || memoIssue.memoStatus[i].for.getMonth() === 3) &&memoIssue.memoStatus[i].for.getFullYear() === Number(year)) {
                    count.MEMO_COUNT += 1;
                    }
                } else if(Number(quarter) === 1){
                    if ((memoIssue.memoStatus[i].for.getMonth() === 4 || memoIssue.memoStatus[i].for.getMonth() === 5 || memoIssue.memoStatus[i].for.getMonth() === 6 || memoIssue.memoStatus[i].for.getMonth() === 7) &&memoIssue.memoStatus[i].for.getFullYear() === Number(year)) {
                    count.MEMO_COUNT += 1;
                    }
                } else if(Number(quarter) === 2){
                    if ((memoIssue.memoStatus[i].for.getMonth() === 8 || memoIssue.memoStatus[i].for.getMonth() === 9 || memoIssue.memoStatus[i].for.getMonth() === 10 || memoIssue.memoStatus[i].for.getMonth() === 11) &&memoIssue.memoStatus[i].for.getFullYear() === Number(year)) {
                    count.MEMO_COUNT += 1;
                    }
                }
            }
        }

        let percentage = {
            NMS_COUNT_P: (count.NMS_COUNT / total.TOTAL_NMS_COUNT) * 100,
            DONATION_P: (count.DONATION_YET / total.DONATION_TARGET) * 100,
            DIG_P: (count.DIG_SALES / total.TOTAL_DIG_SALES) * 100,
            FNCG_P: (count.FNCG_SALES / total.TOTAL_FNCG_SALES) * 100,
            MEMO_P: 0,
        };

        let grades = {
            NMS_COUNT_P: null,
            DONATION_P: null,
            DIG_P: null,
            FNCG_P: null,
            MEMO_P: null,
        };

        for (let key in percentage) {
            if (percentage.hasOwnProperty(key)) {
                if (percentage[key] >= 150) {
                    grades[key] = "A++";
                } else if (percentage[key] >= 125 && percentage[key] < 150) {
                    grades[key] = "A+";
                } else if (percentage[key] >= 100 && percentage[key] < 125) {
                    grades[key] = "A";
                } else if (percentage[key] >= 90 && percentage[key] < 100) {
                    grades[key] = "B";
                } else if (percentage[key] >= 80 && percentage[key] < 90) {
                    grades[key] = "C";
                } else {
                    grades[key] = "D";
                }
            }
        }

        if (count.MEMO_COUNT === 0) {
            percentage.MEMO_P = 100.0;
            grades.MEMO = "A";
        } else if (count.MEMO_COUNT === 1) {
            percentage.MEMO_P = 80.0;
            grades.MEMO = "B";
        } else if (count.MEMO_COUNT === 2) {
            percentage.MEMO_P = 60.0;
            grades.MEMO = "C";
        } else {
            percentage.MEMO_P = 33.33;
            grades.MEMO = "D";
        }

        let graphical = [
            {
                label: "Network",
                value: percentage.NMS_COUNT_P,
                color: "#D61C4E",
            },
            {
                label: "FNCG",
                value: percentage.FNCG_P,
                color: "#FEB139",
            },
            {
                label: "Digital",
                value: percentage.DIG_P,
                color: "#CEE5D0"
            },
            {
                label: "Donation",
                value: percentage.DONATION_P,
                color: "#FFC4C4"
            },
            {
                label: "Behaviour",
                value: percentage.MEMO_P,
                color: "#1F4690"
            },
        ];

        let target_achieved = [
            {
                label: "Network",
                target: total.TOTAL_NMS_COUNT,
                achieved: count.NMS_COUNT,
            },
            {
                label: "FNCG",
                target: total.TOTAL_FNCG_SALES,
                achieved: count.FNCG_SALES,
            },
            {
                label: "Digital",
                target: total.TOTAL_DIG_SALES,
                achieved: count.DIG_SALES,
            },
            {
                label: "Donation",
                target: total.DONATION_TARGET,
                achieved: count.DONATION_YET,
            },
            {
                label: "Behaviour",
                count: count.MEMO_COUNT
            },
        ];

        res.status(200).json({
            success: true,
            data: { graphical, target_achieved, grades },
            message: "Fetched for Quarter - Q" + (Number(quarter) + 1),
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!",
        });
    }
});

router.post("/pms-halfYearly", async (req, res) => {
    const { empId, half, year } = req.body;
    try {
        const recruiter = await nmsEmp.findOne({ empId });
        const allVols = await nmsVol.find({ empId });
        const digitalSales = await digital.findOne({ empId });
        const fncgSales = await fncg.findOne({ empId });
        const memoIssue = await memo.findOne({ empId });

        let count = {
            NMS_COUNT: 0, //
            DONATION_YET: 0, //
            DIG_SALES: 0,
            FNCG_SALES: 0,
            MEMO_COUNT: 0,
        };

        let total = {
            TOTAL_NMS_COUNT: 21*6,
            DONATION_TARGET: 2100*6,
            TOTAL_DIG_SALES: 15000*6,
            TOTAL_FNCG_SALES: 3000*6,
        };

        // No. of Volunteers added by an Employee (Updated after current month ends)
        if (recruiter) {
            for (let i = 0; i < recruiter.monthlyStatus.length; i++) {
                if (Number(half) === 0) {
                    if (
                        (recruiter.monthlyStatus[i].for.getMonth() === 0 || recruiter.monthlyStatus[i].for.getMonth() === 1 || recruiter.monthlyStatus[i].for.getMonth() === 2 || recruiter.monthlyStatus[i].for.getMonth() === 3 || recruiter.monthlyStatus[i].for.getMonth() === 4 || recruiter.monthlyStatus[i].for.getMonth() === 5) &&
                        recruiter.monthlyStatus[i].for.getFullYear() === Number(year)
                    ) {
                        count.NMS_COUNT = recruiter.monthlyStatus[i].count;
                    }
                } else if (Number(half) === 1) {
                    if (
                        (recruiter.monthlyStatus[i].for.getMonth() === 6 || recruiter.monthlyStatus[i].for.getMonth() === 7 || recruiter.monthlyStatus[i].for.getMonth() === 8 || recruiter.monthlyStatus[i].for.getMonth() === 9 || recruiter.monthlyStatus[i].for.getMonth() === 10 || recruiter.monthlyStatus[i].for.getMonth() === 11) &&
                        recruiter.monthlyStatus[i].for.getFullYear() === Number(year)
                    ) {
                        count.NMS_COUNT = recruiter.monthlyStatus[i].count;
                    }
                } 
            }
        }

        // Total Donation done by the Volunteers brought by our Employee
        if (allVols.length > 0) {
            for (let i = 0; i < allVols.length; i++) {
                for (let j = 0; j < allVols[i].donationStatus.length; j++) {
                    if(Number(half) === 0){
                        if ((allVols[i].donationStatus[j].for.getMonth() === 0 || allVols[i].donationStatus[j].for.getMonth() === 1 || allVols[i].donationStatus[j].for.getMonth() === 2 || allVols[i].donationStatus[j].for.getMonth() === 3 || allVols[i].donationStatus[j].for.getMonth() === 4 || allVols[i].donationStatus[j].for.getMonth() === 5) &&
                            allVols[i].donationStatus[j].for.getFullYear() === Number(year)
                        ) {
                            count.DONATION_YET += allVols[i].donationStatus[j].amount;
                        }
                    } else if(Number(half) === 1){
                        if ((allVols[i].donationStatus[j].for.getMonth() === 6 || allVols[i].donationStatus[j].for.getMonth() === 7 || allVols[i].donationStatus[j].for.getMonth() === 8 || allVols[i].donationStatus[j].for.getMonth() === 9 || allVols[i].donationStatus[j].for.getMonth() === 10 || allVols[i].donationStatus[j].for.getMonth() === 11) &&
                            allVols[i].donationStatus[j].for.getFullYear() === Number(year)
                        ) {
                            count.DONATION_YET += allVols[i].donationStatus[j].amount;
                        }
                    }
                }
            }
        }

        // Total Digital Sales done by our Employee
        if (digitalSales) {
            for (let i = 0; i < digitalSales.saleStatus.length; i++) {
                if(Number(half) === 0){
                    if ((digitalSales.saleStatus[i].for.getMonth() === 0 || digitalSales.saleStatus[i].for.getMonth() === 1 || digitalSales.saleStatus[i].for.getMonth() === 2 || digitalSales.saleStatus[i].for.getMonth() === 3 || digitalSales.saleStatus[i].for.getMonth() === 4 || digitalSales.saleStatus[i].for.getMonth() === 5) && digitalSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.DIG_SALES += digitalSales.saleStatus[i].amount;
                    }
                } else if(Number(half) === 1){
                    if ((digitalSales.saleStatus[i].for.getMonth() === 6 || digitalSales.saleStatus[i].for.getMonth() === 7 || digitalSales.saleStatus[i].for.getMonth() === 8 || digitalSales.saleStatus[i].for.getMonth() === 9 || digitalSales.saleStatus[i].for.getMonth() === 10 || digitalSales.saleStatus[i].for.getMonth() === 11) && digitalSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.DIG_SALES += digitalSales.saleStatus[i].amount;
                    }
                }
            }
        }

        // Total FNCG Sales done by our Employee
        if (fncgSales) {
            for (let i = 0; i < fncgSales.saleStatus.length; i++) {
                if(Number(half) === 0){
                    if ((fncgSales.saleStatus[i].for.getMonth() === 0 || fncgSales.saleStatus[i].for.getMonth() === 1 || fncgSales.saleStatus[i].for.getMonth() === 2 || fncgSales.saleStatus[i].for.getMonth() === 3 || fncgSales.saleStatus[i].for.getMonth() === 4 || fncgSales.saleStatus[i].for.getMonth() === 5) &&fncgSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.FNCG_SALES += fncgSales.saleStatus[i].amount;
                    }
                } else if(Number(half) === 1){
                    if ((fncgSales.saleStatus[i].for.getMonth() === 6 || fncgSales.saleStatus[i].for.getMonth() === 7 || fncgSales.saleStatus[i].for.getMonth() === 8 || fncgSales.saleStatus[i].for.getMonth() === 9 || fncgSales.saleStatus[i].for.getMonth() === 10 || fncgSales.saleStatus[i].for.getMonth() === 11) &&fncgSales.saleStatus[i].for.getFullYear() === Number(year)) {
                        count.FNCG_SALES += fncgSales.saleStatus[i].amount;
                    }
                }
            }
        }

        // Total Memo Issued on an Employee by Admin or Director
        if (memoIssue) {
            for (let i = 0; i < memoIssue.memoStatus.length; i++) {
                if(Number(half) === 0){
                    if ((memoIssue.memoStatus[i].for.getMonth() === 0 || memoIssue.memoStatus[i].for.getMonth() === 1 || memoIssue.memoStatus[i].for.getMonth() === 2 || memoIssue.memoStatus[i].for.getMonth() === 3 || memoIssue.memoStatus[i].for.getMonth() === 4 || memoIssue.memoStatus[i].for.getMonth() === 5) &&memoIssue.memoStatus[i].for.getFullYear() === Number(year)) {
                    count.MEMO_COUNT += 1;
                    }
                } else if(Number(half) === 1){
                    if ((memoIssue.memoStatus[i].for.getMonth() === 6 || memoIssue.memoStatus[i].for.getMonth() === 7 || memoIssue.memoStatus[i].for.getMonth() === 8 || memoIssue.memoStatus[i].for.getMonth() === 9 || memoIssue.memoStatus[i].for.getMonth() === 10 || memoIssue.memoStatus[i].for.getMonth() === 11) &&memoIssue.memoStatus[i].for.getFullYear() === Number(year)) {
                    count.MEMO_COUNT += 1;
                    }
                }
            }
        }

        let percentage = {
            NMS_COUNT_P: (count.NMS_COUNT / total.TOTAL_NMS_COUNT) * 100,
            DONATION_P: (count.DONATION_YET / total.DONATION_TARGET) * 100,
            DIG_P: (count.DIG_SALES / total.TOTAL_DIG_SALES) * 100,
            FNCG_P: (count.FNCG_SALES / total.TOTAL_FNCG_SALES) * 100,
            MEMO_P: 0,
        };

        let grades = {
            NMS_COUNT_P: null,
            DONATION_P: null,
            DIG_P: null,
            FNCG_P: null,
            MEMO_P: null,
        };

        for (let key in percentage) {
            if (percentage.hasOwnProperty(key)) {
                if (percentage[key] >= 150) {
                    grades[key] = "A++";
                } else if (percentage[key] >= 125 && percentage[key] < 150) {
                    grades[key] = "A+";
                } else if (percentage[key] >= 100 && percentage[key] < 125) {
                    grades[key] = "A";
                } else if (percentage[key] >= 90 && percentage[key] < 100) {
                    grades[key] = "B";
                } else if (percentage[key] >= 80 && percentage[key] < 90) {
                    grades[key] = "C";
                } else {
                    grades[key] = "D";
                }
            }
        }

        if (count.MEMO_COUNT === 0) {
            percentage.MEMO_P = 100.0;
            grades.MEMO = "A";
        } else if (count.MEMO_COUNT === 1) {
            percentage.MEMO_P = 80.0;
            grades.MEMO = "B";
        } else if (count.MEMO_COUNT === 2) {
            percentage.MEMO_P = 60.0;
            grades.MEMO = "C";
        } else {
            percentage.MEMO_P = 33.33;
            grades.MEMO = "D";
        }

        let graphical = [
            {
                label: "Network",
                value: percentage.NMS_COUNT_P,
                color: "#D61C4E",
            },
            {
                label: "FNCG",
                value: percentage.FNCG_P,
                color: "#FEB139",
            },
            {
                label: "Digital",
                value: percentage.DIG_P,
                color: "#CEE5D0"
            },
            {
                label: "Donation",
                value: percentage.DONATION_P,
                color: "#FFC4C4"
            },
            {
                label: "Behaviour",
                value: percentage.MEMO_P,
                color: "#1F4690"
            },
        ];

        let target_achieved = [
            {
                label: "Network",
                target: total.TOTAL_NMS_COUNT,
                achieved: count.NMS_COUNT,
            },
            {
                label: "FNCG",
                target: total.TOTAL_FNCG_SALES,
                achieved: count.FNCG_SALES,
            },
            {
                label: "Digital",
                target: total.TOTAL_DIG_SALES,
                achieved: count.DIG_SALES,
            },
            {
                label: "Donation",
                target: total.DONATION_TARGET,
                achieved: count.DONATION_YET,
            },
            {
                label: "Behaviour",
                count: count.MEMO_COUNT
            },
        ];

        res.status(200).json({
            success: true,
            data: { graphical, target_achieved, grades },
            message: "Fetched for Half Yearly - HY-" + (Number(half) + 1),
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!",
        });
    }
});

router.post("/pms-yearly", async (req, res) => {
    const { empId, year } = req.body;
    try {
        const recruiter = await nmsEmp.findOne({ empId });
        const allVols = await nmsVol.find({ empId });
        const digitalSales = await digital.findOne({ empId });
        const fncgSales = await fncg.findOne({ empId });
        const memoIssue = await memo.findOne({ empId });

        let count = {
            NMS_COUNT: 0, //
            DONATION_YET: 0, //
            DIG_SALES: 0,
            FNCG_SALES: 0,
            MEMO_COUNT: 0,
        };

        let total = {
            TOTAL_NMS_COUNT: 21*12,
            DONATION_TARGET: 2100*12,
            TOTAL_DIG_SALES: 15000*12,
            TOTAL_FNCG_SALES: 3000*12,
        };

        // No. of Volunteers added by an Employee (Updated after current month ends)
        if (recruiter) {
            for (let i = 0; i < recruiter.monthlyStatus.length; i++) {
                if (recruiter.monthlyStatus[i].for.getFullYear() === Number(year)) {
                    count.NMS_COUNT = recruiter.monthlyStatus[i].count;
                }
            }
        }

        // Total Donation done by the Volunteers brought by our Employee
        if (allVols.length > 0) {
            for (let i = 0; i < allVols.length; i++) {
                for (let j = 0; j < allVols[i].donationStatus.length; j++) {
                    if (allVols[i].donationStatus[j].for.getFullYear() === Number(year)) {
                        count.DONATION_YET += allVols[i].donationStatus[j].amount;
                    }
                }
            }
        }

        // Total Digital Sales done by our Employee
        if (digitalSales) {
            for (let i = 0; i < digitalSales.saleStatus.length; i++) {
                if (digitalSales.saleStatus[i].for.getFullYear() === Number(year)) {
                    count.DIG_SALES += digitalSales.saleStatus[i].amount;
                }
            }
        }

        // Total FNCG Sales done by our Employee
        if (fncgSales) {
            for (let i = 0; i < fncgSales.saleStatus.length; i++) {
                if (fncgSales.saleStatus[i].for.getFullYear() === Number(year)) {
                    count.FNCG_SALES += fncgSales.saleStatus[i].amount;
                }
            }
        }

        // Total Memo Issued on an Employee by Admin or Director
        if (memoIssue) {
            for (let i = 0; i < memoIssue.memoStatus.length; i++) {
                if (memoIssue.memoStatus[i].for.getFullYear() === Number(year)) {
                    count.MEMO_COUNT += 1;
                }
            }
        }

        let percentage = {
            NMS_COUNT_P: (count.NMS_COUNT / total.TOTAL_NMS_COUNT) * 100,
            DONATION_P: (count.DONATION_YET / total.DONATION_TARGET) * 100,
            DIG_P: (count.DIG_SALES / total.TOTAL_DIG_SALES) * 100,
            FNCG_P: (count.FNCG_SALES / total.TOTAL_FNCG_SALES) * 100,
            MEMO_P: 0,
        };

        let grades = {
            NMS_COUNT_P: null,
            DONATION_P: null,
            DIG_P: null,
            FNCG_P: null,
            MEMO_P: null,
        };

        for (let key in percentage) {
            if (percentage.hasOwnProperty(key)) {
                if (percentage[key] >= 150) {
                    grades[key] = "A++";
                } else if (percentage[key] >= 125 && percentage[key] < 150) {
                    grades[key] = "A+";
                } else if (percentage[key] >= 100 && percentage[key] < 125) {
                    grades[key] = "A";
                } else if (percentage[key] >= 90 && percentage[key] < 100) {
                    grades[key] = "B";
                } else if (percentage[key] >= 80 && percentage[key] < 90) {
                    grades[key] = "C";
                } else {
                    grades[key] = "D";
                }
            }
        }

        if (count.MEMO_COUNT === 0) {
            percentage.MEMO_P = 100.0;
            grades.MEMO = "A";
        } else if (count.MEMO_COUNT === 1) {
            percentage.MEMO_P = 80.0;
            grades.MEMO = "B";
        } else if (count.MEMO_COUNT === 2) {
            percentage.MEMO_P = 60.0;
            grades.MEMO = "C";
        } else {
            percentage.MEMO_P = 33.33;
            grades.MEMO = "D";
        }

        let graphical = [
            {
                label: "Network",
                value: percentage.NMS_COUNT_P,
                color: "#D61C4E",
            },
            {
                label: "FNCG",
                value: percentage.FNCG_P,
                color: "#FEB139",
            },
            {
                label: "Digital",
                value: percentage.DIG_P,
                color: "#CEE5D0"
            },
            {
                label: "Donation",
                value: percentage.DONATION_P,
                color: "#FFC4C4"
            },
            {
                label: "Behaviour",
                value: percentage.MEMO_P,
                color: "#1F4690"
            },
        ];

        let target_achieved = [
            {
                label: "Network",
                target: total.TOTAL_NMS_COUNT,
                achieved: count.NMS_COUNT,
            },
            {
                label: "FNCG",
                target: total.TOTAL_FNCG_SALES,
                achieved: count.FNCG_SALES,
            },
            {
                label: "Digital",
                target: total.TOTAL_DIG_SALES,
                achieved: count.DIG_SALES,
            },
            {
                label: "Donation",
                target: total.DONATION_TARGET,
                achieved: count.DONATION_YET,
            },
            {
                label: "Behaviour",
                count: count.MEMO_COUNT
            },
        ];

        res.status(200).json({
            success: true,
            data: { graphical, target_achieved, grades },
            message: "Fetched for Year - " + year,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!",
        });
    }
});

module.exports = router;