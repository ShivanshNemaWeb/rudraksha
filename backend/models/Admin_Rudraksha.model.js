const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
    }
}, {timestamps: true});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;