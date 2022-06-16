const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
      trim: true,
    },
    middlename: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      require: true,
      trim: true,
    },
    fathername: {
      type: String,
      require: true,
    },
    mothername: {
      type: String,
      require: true,
    },
    Dob: {
      type: Date,
      require: true,
      trim: true,
    },
    phone: {
      type: Number,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: String,
    educationStatus: String,
    experience: {
      type: String,
    },
    designation: String,
    location: {
      type: String,
      require: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["F", "M"],
    },
    bloodgroup: String,
    vaccinationDoseOne: {
      type: Date,
      require: true,
    },
    vaccinationDoseTwo: {
      type: Date,
      require: true,
    },
    vaccinationDoseOneAttachment: {
      type: Buffer,
      require: true,
    },
    vaccinationDoseTwoAttachment: {
      type: Buffer,
      require: true,
    },
    profilePic: {
      type: Buffer,
    },
    cv: {
      type: Buffer,
    },
    branch: {
      type: String,
      require: true,
      trim: true,
    },
    remarks: String,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("employee master table", employeeSchema);
module.exports = Employee;
