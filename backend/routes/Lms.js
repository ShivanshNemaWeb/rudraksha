const express = require("express");
const router = express.Router();
const {
  addLeaveApplication,
  approveLeaves,
  getAllLeaves,
} = require("../controllers/Lms");
const {
  authentication,
  costSheetApprovalAccess,
} = require("../middlewares/auth");

router.post("/addLeaveApplication", authentication, addLeaveApplication);
//same middleware as costsheetapprovalAccess is used since approval is being done by same people
router.post("/approveLeaves", costSheetApprovalAccess, approveLeaves);
router.get("/getAllLeaves", costSheetApprovalAccess, getAllLeaves);

module.exports = router;
