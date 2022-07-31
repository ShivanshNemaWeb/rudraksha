const mongoose = require('mongoose');

const ivmsSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please Provide your first name !"]
    }, 
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: [true, "Please Provide your last name !"]
    },
    gender: {
        type: String,
        enum: ["F", "M"],
    },
    fathername: {
        type: String,
        required: [true, "Please Provide your Father's name !"]
    },
    mothername: {
        type: String,
        required: [true, "Please Provide your Mother's name !"]
    },
    dob: {
        type: Date,
        required: [true, "Please Provide your DOB !"]
    },
    educationalStatus: {
        type: String,
        required: [true, "Please Provide your Educational Details !"]
    },
    degree: {
        type: String,
        required: [true, "Please provide details for Degree !"]
    },
    professionalSector: {
        type: String,
        required: [true, "Please Provide your Professional Sector Experience !"]
    },
    emailId: {
        type: String,
        unique: [true, "Email Already Exists !"],
        required: [true, 'Email address is required !'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phoneNo: {
        type: String,
        required: [true, "Please provide your Phone Number !"]
    },
    address: {
        type: String,
        required: [true, "Please provide your full address !"]
    },
    role: {
        type: String,
        enum: {
            values: ['Intern', 'Volunteer', 'Advisor'],
            message: '{VALUE} is not supported'
          }
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    stipend: {
        type: Number,
        required: [true, "Please provide the stipend amount !"]
    },
    panCard: {
        type: String,
        default: null
    },
    aadharCard: {
        type: String,
        default: null
    },
    remarks: {
        type: String,
        maxlength: [300, "Word Limit should not exceed 300 words !!"],
        minlength: [5, "Minimum Word Limit is 5 !!"]
    },
    projectHead: {
        type: String,
        required: [true, "Please provide your Project Head !"]
    },
    projectName: {
        type: String,
        required: [true, "Please provide the Project Name !"]
    }
}, {timestamps: true});

const ivmsModel = mongoose.model("IVMS master table", ivmsSchema);

module.exports = ivmsModel;