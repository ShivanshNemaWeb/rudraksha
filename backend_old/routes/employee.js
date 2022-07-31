const express = require("express");
const router = express.Router();
const multer = require("multer");
const { adminAccess, authentication, onlyAdmin } = require("../middlewares/auth");
const {
  AddEmployee,
  getAllEmployees,
  getEmployeeById,
  createEmployeeReport,
  getEmployeeReport,
  getBarChartDetails,
  getPieChartDetails,
  getGenderDetails,
  getExperienceDetails,
} = require("../controllers/employee");

const uploads = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(".[jpg|jpeg|png|pdf]$")) {
      return cb(new Error("Upload jpg, jpeg, png"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/addEmployee",
  uploads.fields([
    {
      name: "profile",
      maxCount: 1,
    },
    {
      name: "vaccination1",
      maxCount: 1,
    },
    {
      name: "vaccination2",
      maxCount: 1,
    },
    {
      name: "cv",
      maxCount: 1,
    },
  ]),
  onlyAdmin,
  AddEmployee
);

router.post("/createEmployeeReport", createEmployeeReport);
router.get("/getEmployees", getAllEmployees);
router.get("/getEmployeeReport", getEmployeeReport);
router.get("/getBarChartDetails", getBarChartDetails);
router.get("/getPieChartDetails", getPieChartDetails);
router.get("/getGenderDetails", getGenderDetails);
router.get("/getExperienceDetails", getExperienceDetails);
router.get("/getemp/:empid", authentication, getEmployeeById);
module.exports = router;
