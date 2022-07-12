const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "Employee",
        unique: true,
    },
    fullName: {
        type: String,
        require: true,
        ref: "Employee"
    },
    email: {
        type: String,
        require: true,
        unique: true,
        ref: "Employee"
    },
    status: {
        type: String,
        default: "Director"
    }
}, {timestamps: true});

const Director = mongoose.model("Director", directorSchema);
module.exports = Director;