const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/auth");
const { sendOtp, verifyOtp } = require("../controllers/attendance");

router.post("/sendOtp", authentication, sendOtp);
router.post("/verifyOtp", authentication, verifyOtp);

module.exports = router;
