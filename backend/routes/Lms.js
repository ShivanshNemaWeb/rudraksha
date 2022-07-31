const express = require("express");
const router = express.Router();
const {
  addLeaveApplication,
  approveLeaves,
  getAllLeaves,
  getEmployeeLeaves,
  addLeaveApplication_new,
  approveLeaves_new
} = require("../controllers/Lms");
const {
  authentication,
  costSheetApprovalAccess,
  adminAccess,
  onlyAdmin
} = require("../middlewares/auth");

router.post("/addLeaveApplication", authentication, addLeaveApplication);
//same middleware as costsheetapprovalAccess is used since approval is being done by same people
router.post("/approveLeaves", costSheetApprovalAccess, approveLeaves);

router.get("/getEmployeeLeaves", authentication, getEmployeeLeaves);

// Now ADMIN can apply for Leave
router.post("/addLeaveApplication_new", authentication, addLeaveApplication_new);

// ONLY ADMIN ACCESS
router.get("/getAllLeaves", onlyAdmin, getAllLeaves);
router.post("/approveLeaves_new", onlyAdmin, approveLeaves_new);

module.exports = router;
