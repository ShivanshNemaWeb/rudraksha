const Attendance = require("../models/attendance");
const Employee = require("../models/employee");
const sendOtpViaMail = require("../utils/sendOtp");
var ObjectId = require("mongoose").Types.ObjectId;
const sendOtp = async (req, res, next) => {
  try {
    const { empId } = req.body;
    if (!empId || !ObjectId.isValid(empId)) {
      throw new Error("Invalid Employee Id");
    }

    //generated otp
    const otpCode = Math.floor(Math.random() * 10000 + 1);
    //get employee email using employee id
    const emp = await Employee.findById(empId);

    if (!emp) throw new Error("No Employee Exist with that Id");
    console.log(emp.email);
    //send mail
    await sendOtpViaMail(emp.email, otpCode);
    const currentDay = new Date();
    const attendanceInfo = {
      otp: otpCode,
      day: currentDay,
    };
    const attInfo = await Attendance.findOne({ empId });
    const updateOtp = await Attendance.findByIdAndUpdate(
      attInfo._id,
      {
        attendanceDetails: [...attInfo.attendanceDetails, attendanceInfo],
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      attenanceDetails: updateOtp,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Something went Wrong, Please try again later!",
    });
  }
};
const verifyOtp = async (req, res, next) => {
  try {
    const { empId, otp } = req.body;
    if (!empId || !ObjectId.isValid(empId)) {
      throw new Error("Invalid Employee Id");
    }
    const emp = await Employee.findById(empId);

    if (!emp) throw new Error("No Employee Exist with that Id");

    const attInfo = await Attendance.findOne({ empId });
    const date = new Date();
    const presentdate = `${date.getDate()}|${date.getMonth()}|${date.getFullYear()}`;
    const AlreadyGivenAtendance = attInfo.presentDays.find(
      (_date) => _date == presentdate
    );
    if (AlreadyGivenAtendance) throw new Error("Already attendance given!");
    const matchOtp = attInfo.attendanceDetails.find(
      (element) => element.otp == otp
    );
    if (!matchOtp) throw new Error("Invalid Otp!");

    //after otp is matched/verified
    //update attendance noOfpresentdays by incrementing to 1
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attInfo._id,
      {
        noOfDaysPresent: attInfo.noOfDaysPresent + 1,
        presentDays: [...attInfo.presentDays, presentdate],
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      updatedAttendance,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Something went Wrong, Please try again later!",
    });
  }
};
module.exports = {
  sendOtp,
  verifyOtp,
};
