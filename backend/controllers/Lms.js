const Lms = require("../models/Lms");
const Leave = require("../models/leaves");
const _ = require("lodash");
const maxLeaves = require("../models/EmpLeaves");
const Admin = require("../models/Admin_Rudraksha.model");
const Director = require("../models/Director_Rudraksha.model");

const addLeaveApplication_new = async(req,res,next) => {
  try{
    const employee = req.emp;
    const { typeOfLeave, from, to, workFrom, workTo, remarks } = req.body;

    if (!typeOfLeave || !from || !to || !remarks) {
      throw new Error("Please provide all the required details!");
    }

    const startDate = new Date(from);
    const endDate = new Date(to);
    let workFrom1;
    let workTo1; 

    if(workFrom || workTo){
      workFrom1 = new Date(workFrom);
      workTo1 = new Date(workTo);  
    }

    console.log(startDate, endDate, employee.firstname, employee.gender, employee._id);

    const empInLMS = await Lms.findOne({empId: employee._id});

    console.log(empInLMS);

    const daysOFF = (endDate.getTime() - startDate.getTime())/(1000*3600*24);
    
    console.log("daysOFF: " + daysOFF);
    // console.log(empInLMS.casualLeaveDays + daysOFF);

    // Checking if any unchecked Leave in Leave Collection 
    // That leave should be first Approved/Rejected then only User/Employee can add new Leaves
    const leave = await Leave.findOne({status: "Pending", empId: employee._id})

    if(leave){
      res.status(400).json({
        success: false,
        data: `EMP ID with ${employee._id} has a Pending Leave which needs to be Approved/ Rejected by the Admin or Director !!`,
        message: "Please Try again later after your earlier leave has been approved/ rejected !!"
      });
      return -1;
    }


    // Checking how much User have left with his Leave Quota
    if(typeOfLeave === "casual leave" && (empInLMS.casualLeaveDays + daysOFF > empInLMS.causalLeave)){
      throw new Error("You have exceeded the limit of your CLs !! Remaining Leaves: " + (empInLMS.causalLeave - empInLMS.casualLeaveDays));
    }
    else if(typeOfLeave === "sick leave" && (empInLMS.sickLeaveDays + daysOFF > maxLeaves.SICK_LEAVE)){
      throw new Error("You have exceeded the limit of your SLs !! Remaining Leaves: " + (maxLeaves.SICK_LEAVE - empInLMS.sickLeaveDays));
    }
    else if(typeOfLeave === "earned leave" && (empInLMS.earnedLeaveDays + daysOFF > maxLeaves.EARNED_LEAVE)){
      // ending with days are the no of leaves taken till now !
      // console.log(empInLMS.earnedLeaveDays);
      throw new Error("You have exceeded the limit of your ELs !! Remaining Leaves: " + (maxLeaves.EARNED_LEAVE - empInLMS.earnedLeaveDays));
    }
    else if(typeOfLeave === "special leave" && (empInLMS.specialLeaveDays + daysOFF > maxLeaves.SPL_LEAVE)){
      throw new Error("You have exceeded the limit of your Special Leaves !! Remaining Leaves: " + (maxLeaves.SPL_LEAVE - empInLMS.specialLeaveDays));
    }
    // Gender Specific Leaves
    else if(typeOfLeave === "maternity leave" && employee.gender === "M"){
      throw new Error("You cannot apply for a Maternity Leave !!");
    }
    else if(typeOfLeave === "paternity leave" && employee.gender === "F"){
      throw new Error("You cannot apply for a Maternity Leave !!");
    }
    else if(typeOfLeave === "maternity leave" && (empInLMS.maternityLeaveDays + daysOFF > empInLMS.maternityLeave)){
      throw new Error("You have exceeded the limit of your Maternity Leaves !! Remaining Leaves: " + (empInLMS.maternityLeave - empInLMS.maternityLeaveDays));
    }
    else if(typeOfLeave === "paternity leave" && (empInLMS.paternityLeaveDays + daysOFF > empInLMS.paternityLeave)){
      throw new Error("You have exceeded the limit of your Maternity Leaves !! Remaining Leaves: " + (empInLMS.paternityLeave - empInLMS.paternityLeaveDays));
    }
    // FOR WFH
    else if(typeOfLeave === "wfh leave" && (empInLMS.paternityLeaveDays !== 14)){ // MAX LIMIT FOR PAT_L not reached yet
      throw new Error("Please finish your 14 days leaves of Paternity Leaves to utilise the WFH Leaves !! Remaining Leaves: " + (empInLMS.paternityLeave - empInLMS.paternityLeaveDays));
    } 
    else if(typeOfLeave === "wfh leave" && (empInLMS.wfhPaternityLeaveDays + daysOFF > empInLMS.wfhPaternityLeave)){
      throw new Error("You are exceeding the limits of your WFH Paternity Leaves !! Remaining Leaves: " + (empInLMS.wfhPaternityLeave - empInLMS.wfhPaternityLeaveDays))
    }
    // gender specific ends
    else if(typeOfLeave === "mourning leave" && (empInLMS.mourningLeaveDays + daysOFF > maxLeaves.MOURN_LEAVE)){
      throw new Error("You have exceeded the limit of your Mourning Leaves !! Remaining Leaves: " + (maxLeaves.MOURN_LEAVE - empInLMS.mourningLeaveDays));
    }
    else if(typeOfLeave === "emergency leave" && (empInLMS.emergencyLeaveDays + daysOFF > maxLeaves.EMG_LEAVE)){
      throw new Error("You have exceeded the limit of your Emergency Leaves !! Remaining Leaves: " + (maxLeaves.EMG_LEAVE - empInLMS.emergencyLeaveDays));
    }

    // Checking all the Leave Conditions
    if(typeOfLeave === "casual leave" && daysOFF > 2){
      throw new Error("CL can be not exceed more than 2 days !!");
    } 
    else if(typeOfLeave === "sick leave" && daysOFF > 2){
      throw new Error("SICK LEAVES cannot exceed for more than 2 days in a row !!");
    }
    else if(typeOfLeave === "special leave"){
      // Need to check whether the Employee has exhausted his/her CL, EL, medical *** && daysOFF > 7 ***

      if(empInLMS.casualLeaveDays < maxLeaves.CASUAL_LEAVES || empInLMS.earnedLeaveDays < maxLeaves.EARNED_LEAVE || empInLMS.sickLeaveDays < maxLeaves.SICK_LEAVE){
        throw new Error("You still have CLs/SLs/Sick Leaves left ! You cannot apply for any SPL Leaves unless you have exhausted them !!");
      }
      if(daysOFF > 7){
        throw new Error("SPL LEAVES cannot exceed for more than 7 days in a row !!");
      }
    }
    else if(typeOfLeave === "maternity leave" && daysOFF > 150){
      throw new Error("Maternity Leaves cannot exceed for more than 150 days !!");
    }
    else if(typeOfLeave === "paternity leave" && daysOFF > 14){
      throw new Error("Paternity Leaves cannot exceed more than 14 days !!");
    }

    // Everything is OK !!
    try{

      let newLeave;

      if(workFrom1 || workTo1){
        newLeave = new Leave({
          typeOfLeave,
          from: startDate,
          to: endDate,
          remarks,
          compLeavesDates: {workFrom: workFrom1, workTo: workTo1},
          empId: employee._id,
          lmsId: empInLMS._id
        });
      } else {
        newLeave = new Leave({
          typeOfLeave,
          from: startDate,
          to: endDate,
          remarks,
          empId: employee._id,
          lmsId: empInLMS._id
        });
      }

      const leaveDetails = await newLeave.save();

      res.status(201).json({
        success: true,
        data: leaveDetails,
      });

    }catch(e){
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Something went wrong !",
        error: e,
      })
    }

  }catch(e){
    console.log(e);
  }
}

const approveLeaves_new = async(req, res, next) => {
  try{
    const {leaveId, status} = req.body;

    if(!leaveId || !status){
      throw new Error("leave id and status are mandatory fields!");
    }

    const leaveToBeUpdated = await Leave.findOne({_id: leaveId});
    console.log(leaveToBeUpdated);
    const emp_Id = JSON.stringify(req.emp._id);
    const leave_empId = JSON.stringify(leaveToBeUpdated.empId);
    console.log("Logged In: "+emp_Id + "-- Leave Applied By: " + leave_empId);

    const isAdmin = await Admin.findOne({empId: req.emp._id});
    const isDirector = await Director.findOne({empId: req.emp._id});

    if(isDirector){
      console.log("Its Director - Access to Everything!!");
    }

    // Checking if ADMIN or DIRECTOR
    if(isAdmin){
      console.log(isAdmin);
      // Checking if Logged in Approver/Rejector and Applied Leave EMployee is ADMIN
      if(emp_Id === leave_empId){
        console.log("It is ADMIN !!, You cannot approve your Leaves !!");
        res.status(401).json({
          success: false,
          data: "You cannot approve your own Leave Request",
          message: "Director will Look into this matter"
        })
        return -1;
      }
    } 
    // else {
      // The Logged in Person is 
    /*
        {
      _id: new ObjectId("62b698dc448c1ef564acc5b3"),
      typeOfLeave: 'casual leave',
      status: 'Pending',
      from: 2022-06-27T00:00:00.000Z,
      to: 2022-06-29T00:00:00.000Z,
      remarks: 'Family Function!!',
      empId: new ObjectId("62aca4858ac3f9122a87296d"),
      __v: 0
    }*/ 
    console.log(status);
    const startDate = new Date(leaveToBeUpdated.from);
    const endDate = new Date(leaveToBeUpdated.to);
    // console.log(startDate, endDate);
    const daysOFF = (endDate.getTime() - startDate.getTime())/(1000*3600*24);
    // console.log("\n"+daysOFF);
    
    if(status === "Approved"){
      // const updateLMSofEmployee = await Lms.findOne({empId: leaveToBeUpdated.empId});
      const updateLeaveStatus = await Leave.findOneAndUpdate({_id: leaveId}, {status}, {new: true, runValidators: true});
      const LMSofEmp = await Lms.findOne({empId: leaveToBeUpdated.empId});
      // console.log(updateLMSofEmployee);
      if(leaveToBeUpdated.typeOfLeave === "casual leave"){
        let updatedLeaves = LMSofEmp.casualLeaveDays + daysOFF;
        // let updateRemainingLeaves = LMSofEmp.causalLeave - daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {casualLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving CL!!");
      }
      else if(leaveToBeUpdated.typeOfLeave === "sick leave"){
        let updatedLeaves = LMSofEmp.sickLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {sickLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving SL!!");
      }
      //-----
      else if(leaveToBeUpdated.typeOfLeave === "compensatory leave"){
        let updatedLeaves = LMSofEmp.compensatoryLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {compensatoryLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving COMP_L!!");
      }
      else if(leaveToBeUpdated.typeOfLeave === "earned leave"){
        let updatedLeaves = LMSofEmp.earnedLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {earnedLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving EL!!");
      }
      else if(leaveToBeUpdated.typeOfLeave === "special leave"){
        let updatedLeaves = LMSofEmp.specialLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {specialLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving SPL Leaves!!");
      }
      else if(leaveToBeUpdated.typeOfLeave === "maternity leave"){
        let updatedLeaves = LMSofEmp.maternityLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {maternityLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving MATERNITY Leaves!!");
      }
      else if(leaveToBeUpdated.typeOfLeave === "paternity leave"){
        let updatedLeaves = LMSofEmp.paternityLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {paternityLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving PATERNITY Leaves!!");
      }
      else if(leaveToBeUpdated.typeOfLeave === "wfh leave"){
        let updatedLeaves = LMSofEmp.wfhPaternityLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {wfhPaternityLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving PATERNITY WFH Leaves !!")
      }
      else if(leaveToBeUpdated.typeOfLeave === "mourning leave"){
        let updatedLeaves = LMSofEmp.mourningLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {mourningLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving MOURNING Leaves!!");
      }
      else if(leaveToBeUpdated.typeOfLeave === "emergency leave"){
        let updatedLeaves = LMSofEmp.emergencyLeaveDays + daysOFF;
        const updateLMSofEmployee = await Lms.findOneAndUpdate({empId: leaveToBeUpdated.empId}, {emergencyLeaveDays: updatedLeaves}, {new: true, runValidators: true});
        console.log("Done Resolving EMG Leaves!!");
      }
      res.status(200).json({
        success: true,
        data: LMSofEmp,
        message: `The Application for ${leaveToBeUpdated.typeOfLeave} has been approved by the Admin/Director !!`,
      })
    } else if(status === "Rejected"){
      const LMSofEmp = await Lms.findOne({empId: leaveToBeUpdated.empId});
      const updateLeaveStatus = await Leave.findOneAndUpdate({_id: leaveId}, {status}, {new: true, runValidators: true});
      res.status(200).json({
        success: true,
        data: LMSofEmp,
        message: `The Application for ${leaveToBeUpdated.typeOfLeave} has been Rejected by the Admin/Director !!`,
      })
    }
  // }
  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      error: e,
      message: "Something went wrong !!"
    })
  }
}


const approveLeaves = async (req, res, next) => {
  try { 
    const { leaveId, status } = req.body;
    //updating employee leave to rejected/approved
    if (!leaveId || !status)
      throw new Error("leave id and status are mandatory fields!");
    const updateEmpLeave = await Leave.findOneAndUpdate({_id: leaveId}, {status: status}, {new: true, runValidators: true});
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
      // -------------------------------------------------------------------
      typeOfLeave,
      empId: emp,
      from,
      to,
      lmsId: lmsOfEmp._id,
      remarks,
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

const getEmployeeLeaves = async(req, res, next) => {
  try{
    
    const empLeavesRem = await Lms.findOne({empId: req.emp._id});

    if(empLeavesRem){

      let remainingLeaves = {
        CASUAL_LEAVES: (empLeavesRem.causalLeave - empLeavesRem.casualLeaveDays),
        SICK_LEAVE: (maxLeaves.SICK_LEAVE - empLeavesRem.sickLeaveDays),
        EARNED_LEAVE: (maxLeaves.EARNED_LEAVE - empLeavesRem.earnedLeaveDays),
        // COMPL_WEEKL: 
        SPL_LEAVE: (maxLeaves.SPL_LEAVE - empLeavesRem.specialLeaveDays),
        MATERNITY_LEAVE: (empLeavesRem.maternityLeave - empLeavesRem.maternityLeaveDays),
        PATERNITY_LEAVE: (empLeavesRem.paternityLeave - empLeavesRem.paternityLeaveDays),
        // PATL_WFH: 60,
        PATL_WFH_LEAVE: (empLeavesRem.wfhPaternityLeave - empLeavesRem.wfhPaternityLeaveDays),
        MOURN_LEAVE: (maxLeaves.MOURN_LEAVE - empLeavesRem.mourningLeaveDays),
        EMG_LEAVE: (maxLeaves.EMG_LEAVE - empLeavesRem.emergencyLeaveDays)
      }

      let maxEmpLeaves = {
        T_CASUAL_LEAVES: empLeavesRem.causalLeave,
        T_SICK_LEAVE: maxLeaves.SICK_LEAVE,
        T_EARNED_LEAVE: maxLeaves.EARNED_LEAVE,
        // COMPL_WEEKL: 
        T_SPL_LEAVE: maxLeaves.SPL_LEAVE,
        T_MATERNITY_LEAVE: empLeavesRem.maternityLeave,
        T_PATERNITY_LEAVE: empLeavesRem.paternityLeave,
        // T_PATL_WFH: 60,
        T_PATL_WFH_LEAVE: empLeavesRem.wfhPaternityLeave,
        T_MOURN_LEAVE: maxLeaves.MOURN_LEAVE,
        T_EMG_LEAVE: maxLeaves.EMG_LEAVE
      }


      const empName = _.startCase(`${req.emp.firstname} ${req.emp.lastname}`);             
        res.json({
          success: true,
          data: {
            remainingLeaves,
            maxEmpLeaves
          },
          emp: {
            doj: req.emp.createdAt,
            empName,
            empId: req.emp._id,
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
  getEmployeeLeaves,
  addLeaveApplication_new,
  approveLeaves_new
};
