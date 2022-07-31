const express = require("express");
const router = express.Router();
const { createEmployeeCredentials, signIn } = require("../controllers/Login");
const { adminAccess, onlyAdmin } = require("../middlewares/auth");

//this route creates the password using empId (can be created only by admins)
router.post(
  "/createEmployeeCredentials",
  onlyAdmin,
  createEmployeeCredentials
);

router.post("/login", signIn);
 
module.exports = router;
