const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  projectName: {
    type: String,
    trim: true,
    require: true,
  },
  projectHead: {
    type: String,
    trim: true,
    require: true,
  },
  eventCode: {
    type: String,
    trim: true,
    require: true,
  },
  eventNumber: {
    type: Number,
    trim: true,
    require: true,
  },
  venue: {
    type: String,
    trim: true,
    require: true,
  },
  dateOfEvent: {
    type: Date,
    trim: true,
    require: true,
  },
  time: {
    type: String,
    trim: true,
    require: true,
  },
  projectManager: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  assistantProjectManager: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  helpStaff: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  Allvendors: {
    type: [mongoose.Types.ObjectId],
    ref: "Vendor",
  },
  budgetedCost: {
    type: Number,
    trim: true,
    require: true,
  },
  actualCost: {
    type: Number,
    trim: true,
    require: true,
    default: 0,
  },
  branchName: {
    type: String,
    trim: true,
    require: true,
  },
  remarks: String,
  eventAbbreviation: {
    type: String,
    trim: true,
    require: true,
  },
  projectNumber: {
    type: Number,
    trim: true,
    require: true,
  },
  empId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Employee",
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Approved", "Rejected"],
  },
});
const Event = mongoose.model("event master table", eventSchema);
module.exports = Event;
