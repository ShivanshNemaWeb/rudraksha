const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Employee",
        required: [true, "Please Enter your EMP ID !!"]
    },
    currentDate: {
        type: Date
    },
    latestMemoIssuedOn: {
        type: Date,
        default: null
    },
    latestMemoTypeIssued: {
        type: String,
        default: null
    },
    isOffender: {
        type: Boolean,
        default: false
    },
    memoCount: {
        type: Number,
        default: 0
    },
    memoStatus: [{for: Date, memoType: String, remarks: String}],
    remarks: {
        type: String,
        default: null
    },
    totalMemoYearly: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const memoModel = mongoose.model("Memo master table", memoSchema);

module.exports = memoModel;