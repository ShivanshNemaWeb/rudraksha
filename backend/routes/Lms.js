const express = require("express");
const router = express.Router();
const {
  addLeaveApplication,
  approveLeaves,
  getAllLeaves,
  getEmployeeLeaves
} = require("../controllers/Lms");
const {
  authentication,
  costSheetApprovalAccess,
} = require("../middlewares/auth");

router.post("/addLeaveApplication", authentication, addLeaveApplication);
//same middleware as costsheetapprovalAccess is used since approval is being done by same people
router.post("/approveLeaves", costSheetApprovalAccess, approveLeaves);
router.get("/getAllLeaves", costSheetApprovalAccess, getAllLeaves);
router.get("/getEmployeeLeaves", authentication, getEmployeeLeaves);
module.exports = router;
