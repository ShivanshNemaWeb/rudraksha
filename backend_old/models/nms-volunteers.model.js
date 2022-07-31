const mongoose = require("mongoose");

const volunteerNMSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Employee",
        required: [true, "Please Enter your EMP ID !!"]
    },
    volName: {
        type: String,
        required: [true, "Please Enter your full name !!"]
    },
    // profilePic: {
    //     type: Buffer,
    // },
    volDob: {
        type: Date,
        required: [true, "DOB is required !!"],
    },
    volEmail: {
        type: String,
        unique: [true, "Email Already Exists !"],
        required: [true, 'Email address is required !'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    volNumber: {
        type: String,
        required: [true, "Please provide your Phone Number !"]
    },
    volAddress: {
        type: String,
        required: [true, "Please provide your full address !"]
    },
    volStartDate: {
        type: Date,
        required: [true, "Please provide the Starting Date !!"]
    },
    volEndDate: {
        type: Date,
        required: [true, "Please provide the Ending Date !!"]
    },
    volProfession: {
        type: String
    },
    volProjectHead: {
        type: String,
        required: [true, "Please provide the Project Head !!"]
    },
    volProjectName: {
        type: String,
        required: [true, "Please provide the Project Name !!"]
    },
    remarks: {
        type: String,
        maxlength: [300, "Word Limit should not exceed 300 words !!"],
        minlength: [5, "Minimum Word Limit is 5 !!"]
    }

});

const volunteerNMSModel = mongoose.model("NMS Emp - Volunteer master", volunteerNMSchema);
module.exports = volunteerNMSModel;