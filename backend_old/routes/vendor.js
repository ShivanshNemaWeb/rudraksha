const express = require("express");
const router = express.Router();
const { adminAccess } = require("../middlewares/auth");
const {
  AddVendor,
  getAllVendors,
  createVendorReport,
  getVendorReport,
  getVendorTypeDetails,
} = require("../controllers/vendor");

router.post("/createVendorReport", createVendorReport);
router.post("/addVendor", adminAccess, AddVendor);
router.get("/getVendors", getAllVendors);
router.get("/getVendorReport", getVendorReport);
router.get("/getVendorTypeDetails", getVendorTypeDetails);

module.exports = router;
