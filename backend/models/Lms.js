const mongoose = require("mongoose");
const LmsSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Employee",
    unique: true,
  },
  causalLeave: {
    //per year - allowed leaves
    type: Number,
    default: 12,
  },
  sickLeave: {
    type: Number,
    default: 12,
  },
  earnedLeave: {
    type: Number,
    default: 7,
  },
  specialLeave: {
    type: Number,
    default: 14,
  },
  maternityLeave: Number,
  paternityLeave: Number,
  mourningLeave: {
    type: Number,
    default: 15,
  },
  emergencyLeave: {
    type: Number,
    default: 7,
  },
  wfhPaternityLeave: Number,
  casualLeaveDates: [Object],
  sickLeaveDates: [Object],
  earnedLeaveDates: [Object],
  compensatoryLeaveDates: [Object],
  specialLeaveDates: [Object],
  maternityLeaveDates: [Object],
  paternityLeaveDates: [Object],
  mourningLeaveDates: [Object],
  emergencyLeaveDates: [Object],

  // These are the original Leaves taken by the employee !!
  casualLeaveDays: {
    type: Number,
    default: 0,
  },
  sickLeaveDays: {
    type: Number,
    default: 0,
  },
  earnedLeaveDays: {
    type: Number,
    default: 0,
  },
  compensatoryLeaveDays: {
    type: Number,
    default: 0,
  },
  specialLeaveDays: {
    type: Number,
    default: 0,
  },
  maternityLeaveDays: {
    type: Number,
    default: 0,
  },
  paternityLeaveDays: {
    type: Number,
    default: 0,
  },
  mourningLeaveDays: {
    type: Number,
    default: 0,
  },
  emergencyLeaveDays: {
    type: Number,
    default: 0,
  },
  wfhPaternityLeaveDays: {
    type: Number,
    default: 0
  },
  remarks: String,
});
const Lms = mongoose.model("Leave master table", LmsSchema);
module.exports = Lms;
