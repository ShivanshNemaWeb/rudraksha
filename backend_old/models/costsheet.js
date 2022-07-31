const mongoose = require("mongoose");

const costSheetSchema = mongoose.Schema({
  costSheet: {
    type: Object,
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Event",
  },
  empId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Employee",
  },
});
const CostSheet = mongoose.model("costsheet master table", costSheetSchema);

module.exports = CostSheet;
