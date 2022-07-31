const mongoose = require("mongoose");
const leavesSchema = new mongoose.Schema({
  typeOfLeave: {
    type: String,
    enum: [
      "casual leave",
      "sick leave",
      "earned leave",
      "compensatory leave",
      "special leave",
      "maternity leave",
      "paternity leave",
      "mourning leave",
      "emergency leave",
    ],
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Approved", "Rejected"],
  },
  from: {
    type: Date,
  },
  to: {
    type: Date
  },
  compLeavesDates: {
    workFrom: {
      type: Date,
      default: null
    },
    workTo: {
      type: Date,
      default: null
    },
  },
  remarks:{
    type: String,
  },
  empId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Employee",
  },
  lmsId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Lms",
    // unique: true,
  },
});
const Leave = mongoose.model("Leaves master Table", leavesSchema);
module.exports = Leave;
