const mongoose = require("mongoose");
const receptionSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  Gender: {
    type: String,
    require: true,
    enum: ["Male", "Female"],
  },
  phoneNumber: {
    type: Number,
    require: true,
    trim: true,
  },
  purpose: {
    type: String,
    require: true,
    enum: ["Official", "Personal", "Casual"],
  },
  accompanies: {
    type: Number,
    require: true,
    trim: true,
  },
  photo: {
    type: String,
    require: true,
    trim: true,
  },
  intime: {
    type: Date,
  },
  outtime: {
    type: Date,
  },
  guestcode: {
    type: String,
    unique: true,
    require: true,
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Employee",
  },
  remarks: String,
});

const Reception = mongoose.model("reception master table", receptionSchema);
module.exports = Reception;
