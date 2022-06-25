const lodash= require('lodash');
const Lms = require("../models/Lms");
const Leave = require("../models/leaves");
const addLeaveApplication = async (req, res, next) => {
  try {
    const emp = req.emp;
    console.log(emp._id.toString());
    console.log(emp.designation);
    const { typeOfLeave, from, to, remarks } = req.body;
    if (!typeOfLeave || !from || !to) {
      throw new Error("Please provide all the required details!");
    }

    const lmsOfEmp = await Lms.findOne({ empId: emp._id.toString() });

    const date1 = new Date(from);
    const date2 = new Date(to);

    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days);
    console.log(typeOfLeave);
    if (typeOfLeave == "casual leave" && Difference_In_Days > 2)
      throw new Error("Casual Leave is only allowed max upto 2 days!");
    else if (
      typeOfLeave == "sick leave" &&
      emp.designation == "Interns/Volunteer" &&
      Difference_In_Days > 2
    )
      throw new Error("Interns can have maximum of 2 sick leaves");
    else if (typeOfLeave == "compensatory leave") {
      //checking if emp worked on a sat
    } else if (typeOfLeave == "special leave" && Difference_In_Days > 7)
      throw new Error("Special Leave cannot be more than 7 days in a row.");
    else if (typeOfLeave == "maternity leave" && Difference_In_Days < 45)
      throw new Error(
        "It is compulsary to take this leave in continuation at least 45 days of expected delivery date."
      );
    else if (typeOfLeave == "maternity leave" && Difference_In_Days > 150)
      throw new Error("Maternity Leave can be taken maximum upto 150 days.");
    else if (typeOfLeave == "paternity leave" && Difference_In_Days > 14)
      throw new Error("Paternity Leave can be taken maximum upto 14 days.");

    //check if max holidays reached
    if (
      typeOfLeave == "casual leave" &&
      Difference_In_Days + lmsOfEmp.casualLeaveDays > lmsOfEmp.causalLeave
    )
      throw new Error("12 Causal Leaves can be used a year");
    else if (
      typeOfLeave == "sick leave" &&
      Difference_In_Days + lmsOfEmp.sickLeaveDays > lmsOfEmp.sickLeave
    )
      throw new Error("12 Sick Leaves can be used a year");
    else if (
      typeOfLeave == "earned leave" &&
      Difference_In_Days + lmsOfEmp.earnedLeaveDays > lmsOfEmp.earnedLeave
    )
      throw new Error("7 Earned Leaves can be used a year");
    else if (
      typeOfLeave == "special leave" &&
      Difference_In_Days + lmsOfEmp.specialLeaveDays > lmsOfEmp.causalLeave
    )
      throw new Error("14 Special Leaves can be used a year");
    else if (
      typeOfLeave == "maternity leave" &&
      Difference_In_Days + lmsOfEmp.maternityLeaveDays > lmsOfEmp.maternityLeave
    )
      throw new Error("You dont have any maternity leaves left!");
    else if (
      typeOfLeave == "paternity leave" &&
      Difference_In_Days + lmsOfEmp.paternityLeaveDays > lmsOfEmp.paternityLeave
    )
      throw new Error("You dont have any paternity leaves left!");
    else if (
      typeOfLeave == "mourning leave" &&
      Difference_In_Days + lmsOfEmp.mourningLeaveDays > lmsOfEmp.mourningLeave
    )
      throw new Error("You dont have any mourning leaves left!");
    else if (
      typeOfLeave == "emergency leave" &&
      Difference_In_Days + lmsOfEmp.emergencyLeaveDays > lmsOfEmp.emergencyLeave
    )
      throw new Error("You dont have any mourning leaves left!");

    //update the no of leaves taken by emp
    const date = new Date();
    let updateLms;
    if (typeOfLeave == "casual leave") {
      updateLms = await Lms.findByIdAndUpdate(
        lmsOfEmp._id,
        {
          casualLeaveDates: [...lmsOfEmp.casualLeaveDates, date],
          $inc: {
            casualLeaveDays: 1,
          },
        },
        { new: true }
      );
    } else if (typeOfLeave == "sick leave") {
      updateLms = await Lms.findByIdAndUpdate(
        lmsOfEmp._id,
        {
          sickLeaveDates: [...lmsOfEmp.sickLeaveDates, date],
          $inc: {
            sickLeaveDays: 1,
          },
        },
        { new: true }
      );
    } else if (typeOfLeave == "earned leave") {
      updateLms = await Lms.findByIdAndUpdate(
        lmsOfEmp._id,
        {
          earnedLeaveDates: [...lmsOfEmp.earnedLeaveDates, date],
          $inc: {
            earnedLeaveDays: 1,
          },
        },
        { new: true }
      );
    } else if (typeOfLeave == "special leave") {
      updateLms = await Lms.findByIdAndUpdate(
        lmsOfEmp._id,
        {
          specialLeaveDates: [...lmsOfEmp.specialLeaveDates, date],
          $inc: {
            sickLeaveDays: 1,
          },
        },
        { new: true }
      );
    } else if (typeOfLeave == "maternity leave") {
      updateLms = await Lms.findByIdAndUpdate(
        lmsOfEmp._id,
        {
          maternityLeaveDates: [...lmsOfEmp.maternityLeaveDates, date],
          $inc: {
            maternityLeaveDays: 1,
          },
        },
        { new: true }
      );
    } else if (typeOfLeave == "paternity leave") {
      updateLms = await Lms.findByIdAndUpdate(
        lmsOfEmp._id,
        {
          paternityLeaveDates: [...lmsOfEmp.paternityLeaveDates, date],
          $inc: {
            paternityLeaveDays: 1,
          },
        },
        { new: true }
      );
    } else if (typeOfLeave == "mourning leave") {
      updateLms = await Lms.findByIdAndUpdate(
        lmsOfEmp._id,
        {
          mourningLeaveDates: [...lmsOfEmp.mourningLeaveDates, date],
          $inc: {
            mourningLeaveDays: 1,
          },
        },
        { new: true }
      );
    } else if (typeOfLeave == "emergency leave") {
      updateLms = await Lms.findByIdAndUpdate(
        lmsOfEmp._id,
        {
          emergencyLeaveDates: [...lmsOfEmp.emergencyLeaveDates, date],
          $inc: {
            emergencyLeaveDays: 1,
          },
        },
        { new: true }
      );
    }

    const leave = new Leave({
      typeOfLeave,
      empId: emp,
      lmsId: lmsOfEmp._id,
      remarks,
      from,
      to
    });
    await leave.save();

    res.json({
      success: true,
      data: leave,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Something went wrong, please try again later!",
    });
  }
};

const approveLeaves = async (req, res, next) => {
  try {
    const { leaveId, status } = req.body;
    //updating employee leave to rejected/approved
    if (!leaveId || !status)
      throw new Error("leave id and status are mandatory fields!");
      const updateEmpLeave = await Leave.findOneAndUpdate({_id: leaveId}, 
        {status: status}, 
        {new: true, runValidators: true});
    res.json({
      success: true,
      data: updateEmpLeave,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Some Error Occured, Please try again later!",
    });
  }
};

const getAllLeaves = async (req, res, next) => {
  try {
    const empLeaves = await Leave.find({});
    res.json({
      success: true,
      data: empLeaves,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Some Error Occured, Please try again later",
    });
  }
};

//Employee Leaves
const getEmployeeLeaves = async(req, res, next) => {
  try{
    
    const empLeavesRem = await Lms.findOne({empId: req.emp._id});

    if(empLeavesRem){

      const empName = `${req.emp.firstname} ${req.emp.lastname}`;
                             
      res.json({
        success: true,
        data: empLeavesRem,
        emp: {
          doj: req.emp.createdAt,
          empName,
        }
      });
      

    } else {
      res.json({
        success: false,
        message: "No Record for the Employee in LMS !"
      })
    }

  }catch(e){
    console.log(e);
    res.json({
      success: false,
      error: e.message
    })
  }
}


module.exports = {
  addLeaveApplication,
  approveLeaves,
  getAllLeaves,
  getEmployeeLeaves
};
