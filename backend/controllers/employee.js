const Employee = require("../models/employee");
const Attendance = require("../models/attendance");
const Lms = require("../models/Lms");
const empTrackModel = require("../models/nms-empTrack.model");
const digitalSaleModel = require("../models/salesDIGITAL.model");
const fncgSalesModel = require("../models/salesFNCG.model");

const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");
const pdfTemplate = require("../reports/employee");
const moment = require("moment");
const pdf = require("html-pdf");
const sharp = require("sharp");
const _ = require("lodash");

const AddEmployee = async (req, res, next) => {
  try {
    const exisitingEmp = await Employee.find({ email: req.body.email });
    // console.log(exisitingEmp);
    if (exisitingEmp.length > 0) {
      throw new Error("The Given Employee Already Exist");
    }

    const firstname = _.startCase(req.body.firstname);
    const middlename = _.startCase(req.body.middlename);
    const lastname = _.startCase(req.body.lastname);

    const emp = new Employee({
      ...req.body,
      firstname,
      middlename,
      lastname,
      vaccinationDoseOneAttachment: req.files.vaccination1[0].buffer,
      vaccinationDoseTwoAttachment: req.files.vaccination2[0].buffer,
      profilePic: await sharp(req.files.profile[0].buffer)
        .resize({ width: 200, height: 200 })
        .png()
        .toBuffer(),
      cv: req.files.cv[0].buffer,
    });
    
    await emp.save();
    
    // console.log(req.body.gender);
    const doj = new Date(emp.createdAt);
    /////////////////////////////////////////////////////////
    // creating a tracker instance for each employee
    const newTracker = new empTrackModel({
      empId: emp._id,
      currentDate: doj
    });

    const saveTracker = await newTracker.save();
    console.log(saveTracker);

    /////////////////////////////////////////////////////////
    // creating a sales instance for each employee
    const digital = new digitalSaleModel({
      empId: emp._id,
      currentDate: doj
    });

    const saveDigital = await digital.save();
    console.log(saveDigital);

    const fncg = new fncgSalesModel({
      empId: emp._id,
      currentDate: doj,
    });

    const savefncg = await fncg.save();
    console.log(savefncg);
    /////////////////////////////////////////////////////////
    // creating a lms instance for each employee
    const remCausalLeaves = 12 - (doj.getMonth() + 1);
    const lms = new Lms({
      empId: emp._id,
      causalLeave: remCausalLeaves,
      maternityLeave: req.body.gender == "F" ? 150 : 0,
      paternityLeave: req.body.gender == "M" ? 14 : 0,
      wfhPaternityLeave: req.body.gender == "M" ? 60 : 0,
    });
    await lms.save();
    //creating a attendance instance/document for this employee which will
    // have this employee attendance details like otps generated details,
    // no of days present..etc..
    const att = await Attendance.create({
      empId: emp._id,
    });
    // run everyday at midnight to increment noOfWorkingDays by one

    schedule.scheduleJob("0 0 * * *", async () => {
      const day = new Date().getDay();
      if (day >= 2) {
        const updateWorkingDays = await Attendance.findByIdAndUpdate(
          att._id,
          {
            $inc: {
              noOfWorkingDays: 1,
            },
          },
          {
            new: true,
          }
        );
      }
    });

    schedule.scheduleJob("0 0 1 1 *", async () => {
      const updateLeaves = await Lms.findByIdAndUpdate(
        lms._id,
        {
          casualLeaveDays: 0,
          sickLeaveDays: 0,
          earnedLeaveDays: 0,
          compensatoryLeaveDays: 0,
          specialLeaveDays: 0,
          maternityLeaveDays: 0,
          paternityLeaveDays: 0,
          mourningLeaveDays: 0,
          emergencyLeaveDays: 0,
        },
        {
          new: true,
        }
      );
    });

    res.status(201).json({
      success: true,
      employee: emp,
      message: "employee data succesfully added",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const { empid } = req.params;
    const emp = await Employee.findById(empid);
    res.json({
      success: true,
      data: emp,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find(
      {},
      {
        remarks: 0,
        cv: 0,
        profilePic: 0,
        vaccinationDoseTwoAttachment: 0,
        vaccinationDoseOneAttachment: 0,
        vaccinationDoseTwo: 0,
        vaccinationDoseOne: 0,
        bloodgroup: 0,
        // location: '',
        // designation: '',
        educationStatus: 0,
        experience: 0,
        // email: 0,
        // phone: 0,
        password: 0,
        Dob: 0,
        mothername: 0,
        fathername: 0,
      }
    );
    res.status(201).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const createEmployeeReport = async (req, res, next) => {
  try {
    const { reportDesignation, reportBranch } = req.body;
    let obj = {};
    if (reportDesignation) {
      obj = {
        designation: reportDesignation,
      };
    } else if (reportBranch) {
      obj = {
        branch: reportBranch,
      };
    } else if (reportBranch && reportDesignation) {
      obj = {
        designation: reportDesignation,
        branch: reportBranch,
      };
    }
    let getData;
    getData = await Employee.find(obj, {
      vaccinationDoseOneAttachment: 0,
      vaccinationDoseTwoAttachment: 0,
      cv: 0,
      middlename: 0,
      fathername: 0,
      mothername: 0,
      Dob: 0,
      bloodgroup: 0,
      vaccinationDoseOne: 0,
      vaccinationDoseTwo: 0,
      remarks: 0,
    });
    const filtered = getData.filter((value) => {
      if (
        moment(req.body.startDate).isBefore(value.createdAt) &&
        moment(req.body.endDate).isAfter(value.createdAt)
      ) {
        return value;
      }
    });
    getData = filtered.length > 0 ? filtered : getData;
    let employees = [];
    getData.forEach((val) => {
      employees.push({
        name:
          (val.gender == "F" ? "Ms " : "Mr ") +
          val.firstname +
          " " +
          val.lastname,
        email: val.email,
        phoneNumber: val.phone,
        educationStatus: val.educationStatus,
        experience: val.experience,
        designation: val.designation,
        location: val.location,
        datofJoining: moment(val.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        id: val._id.toString(),
        profilepic:
          "data:image/png;base64," + val.profilePic.toString("base64"),
      });
    });
    const logopath = path.join(__dirname, "../RWFLOGO.png");
    const data = fs.readFileSync(logopath);
    const logo = "data:image/png;base64," + data.toString("base64");
    pdf
      .create(
        pdfTemplate(
          employees,
          moment().format("MMMM Do YYYY, h:mm:ss a"),
          logo
        ),

        {
          format: "Letter",
          orientation: "portrait",
          type: "pdf",
          timeout: 100000,
          border: 10,
          header: {
            height: "10mm",
          },
          footer: {
            height: "7mm",
          },
        }
      )
      .toFile("employee.pdf", (err) => {
        if (err) {
          throw new Error(err);
        }
        res.json({
          success: true,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

const getEmployeeReport = async (req, res, next) => {
  try {
    const filepath = path.join(__dirname, "../employee.pdf");
    res.sendFile(filepath);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

const getBarChartDetails = async (req, res, next) => {
  try {
    const designationDetails = [
      {
        label: "Promoter",
        value: await Employee.find({ designation: "Promoter" }).count(),
      },
      {
        label: "Managing Director",
        value: await Employee.find({
          designation: "Managing Director",
        }).count(),
      },
      {
        label: "Director",
        value: await Employee.find({ designation: "Director" }).count(),
      },
      {
        label: "Branch Manager",
        value: await Employee.find({ designation: "Branch Manager" }).count(),
      },
      {
        label: "Zonal Head",
        value: await Employee.find({ designation: "Zonal Head" }).count(),
      },
      {
        label: "Regional Head",
        value: await Employee.find({ designation: "Regional Head" }).count(),
      },
      {
        label: "Cluster Head",
        value: await Employee.find({ designation: "Cluster Head" }).count(),
      },
      {
        label: "Branch Head",
        value: await Employee.find({ designation: "Branch Head" }).count(),
      },
      {
        label: "Operations Manager",
        value: await Employee.find({
          designation: "Operations Manager",
        }).count(),
      },
      {
        label: "Admin Manager",
        value: await Employee.find({ designation: "Admin Manager" }).count(),
      },
      {
        label: "HR Manager",
        value: await Employee.find({ designation: "HR Manager" }).count(),
      },
      {
        label: "Sales Manager",
        value: await Employee.find({ designation: "Sales Manager" }).count(),
      },
      {
        label: "Relationship Manager",
        value: await Employee.find({
          designation: "Relationship Manager",
        }).count(),
      },
      {
        label: "Help Staff",
        value: await Employee.find({ designation: "Help Staff" }).count(),
      },
      {
        label: "Guard",
        value: await Employee.find({ designation: "Guard" }).count(),
      },
      {
        label: "Interns/Volunteer",
        value: await Employee.find({
          designation: "Interns/Volunteer",
        }).count(),
      },
      {
        label: "Receptionist",
        value: await Employee.find({ designation: "Receptionist" }).count(),
      },
    ];
    res.json({
      success: true,
      data: designationDetails.sort((a, b) => b.value - a.value),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong, Try Again!",
      error: error.message,
    });
  }
};

const getPieChartDetails = async (req, res, next) => {
  try {
    const bloodgroupDetails = [
      {
        label: "O+",
        value: await Employee.find({ bloodgroup: "O+" }).count(),
      },
      {
        label: "O-",
        value: await Employee.find({ bloodgroup: "O-" }).count(),
      },
      {
        label: "A+",
        value: await Employee.find({ bloodgroup: "A+" }).count(),
      },
      {
        label: "A-",
        value: await Employee.find({ bloodgroup: "A-" }).count(),
      },
      {
        label: "B+",
        value: await Employee.find({ bloodgroup: "B+" }).count(),
      },
      {
        label: "B-",
        value: await Employee.find({ bloodgroup: "B-" }).count(),
      },
      {
        label: "AB+",
        value: await Employee.find({ bloodgroup: "AB+" }).count(),
      },
      {
        label: "AB-",
        value: await Employee.find({ bloodgroup: "AB-" }).count(),
      },
    ];
    res.json({
      success: true,
      data: bloodgroupDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong, Try Again!",
      error: error.message,
    });
  }
};

const getGenderDetails = async (req, res, next) => {
  try {
    const genderDetails = [
      {
        label: "Female Employees",
        value: await Employee.find({ gender: "F" }).count(),
      },
      {
        label: "Male Employees",
        value: await Employee.find({ gender: "M" }).count(),
      },
    ];
    res.json({
      success: true,
      data: genderDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong, Try Again!",
      error: error.message,
    });
  }
};

const getExperienceDetails = async (req, res, next) => {
  try {
    const experienceDetails = [
      {
        label: "0-2years",
        value: await Employee.find({ experience: "0-2" }).count(),
      },
      {
        label: "2-4years",
        value: await Employee.find({ experience: "2-4" }).count(),
      },
      {
        label: "4-6years",
        value: await Employee.find({ experience: "4-6" }).count(),
      },
      {
        label: "6-8years",
        value: await Employee.find({ experience: "6-8" }).count(),
      },
      {
        label: "8-10years",
        value: await Employee.find({ experience: "8-10" }).count(),
      },
    ];
    res.json({
      success: true,
      data: experienceDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong, Try Again!",
      error: error.message,
    });
  }
};

module.exports = {
  AddEmployee,
  getAllEmployees,
  getEmployeeById,
  createEmployeeReport,
  getEmployeeReport,
  getBarChartDetails,
  getPieChartDetails,
  getGenderDetails,
  getExperienceDetails,
};
