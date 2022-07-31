const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  vendorName: {
    type: String,
    trim: true,
    require: true,
  },
  vendorShopName: {
    type: String,
    trim: true,
    require: true,
  },
  vendorShopAddress: {
    type: String,
    trim: true,
    require: true,
  },
  vendorGST: {
    type: Number,
    require: true,
  },
  vendorACNumber: {
    type: String,
    require: true,
  },
  vendorIFSC: {
    type: String,
    trim: true,
    require: true,
  },
  vendorBankName: {
    type: String,
    trim: true,
    require: true,
  },
  vendorPhoneNumber: {
    type: Number,
    require: true,
  },
  vendorUpi: {
    type: String,
    trim: true,
    require: true,
  },
  UPIType: {
    type: String,
    enum: ["Gpay", "Phone Pay", "Paytm", "BHIM"],
  },
  vendorType: {
    type: String,
    require: true,
  },
  vendorRepName: {
    type: String,
    trim: true,
    require: true,
  },
  vendorRepPhone: {
    type: Number,
    require: true,
  },
  vendorEmail: {
    type: String,
    trim: true,
    require: true,
  },
  vendorRepEmail: {
    type: String,
    trim: true,
    require: true,
  },
  remarks: String,
});

const Vendor = mongoose.model("vendor master table", vendorSchema);
module.exports = Vendor;
