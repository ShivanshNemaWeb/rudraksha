const mongoose = require("mongoose");

const AttendanceSchema = mongoose.Schema({
  empId: {
    type: mongoose.Types.ObjectId,
    require: true,
    unique: true,
    ref: "Employee",
  },
  noOfWorkingDays: {
    type: Number,
    default: 0,
  },
  noOfDaysPresent: {
    type: Number,
    default: 0,
  },
  attendanceDetails: [Object],
  presentDays: [String],
});
const Attendance = mongoose.model("attendance master table", AttendanceSchema);

module.exports = Attendance;
