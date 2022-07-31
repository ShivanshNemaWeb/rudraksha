const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");
const Admin = require("../models/Admin_Rudraksha.model");
const Director = require("../models/Director_Rudraksha.model");

const adminAccess = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      const decode = jwt.verify(token, process.env.secret);

      if (
        decode.email === process.env.ADMIN_USERNAME &&
        decode.password === process.env.ADMIN_PASSWORD
      ) {
        next();
      } else {
        res.json({
          success: false,
          error: "You are not authorized to use this page!",
          message: "You are not authorized to use this page!",
        });
      }
    } else {
      res.json({
        success: false,
        error: "You are not authorized to use this page!",
        message: "You are not authorized to use this page!",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error: error });
  }
};

const authentication = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      const decode = jwt.verify(token, process.env.secret);
      // if (
      //   decode.email === process.env.ADMIN_USERNAME &&
      //   decode.password === process.env.ADMIN_PASSWORD
      // ) {
      //   //for admin access part, few work is left
      //   next();
      // } else
      if (decode.id) {
        const emp = await Employee.findOne({ _id: decode.id });
        req.emp = emp;
        next();
      } else {
        res.json({
          success: false,
          error: "You are not authorized to use this page!",
          message: "You are not authorized to use this page!",
        });
      }
    } else {
      res.json({
        success: false,
        error: "You are not authorized to use this page!",
        message: "You are not authorized to use this page!",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error: error });
  }
};

const costSheetApprovalAccess = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      const decode = jwt.verify(token, process.env.secret);
      if (
        decode.email === process.env.ADMIN_USERNAME &&
        decode.password === process.env.ADMIN_PASSWORD
      ) {
        next();
      } else if (decode.id) {
        const emp = await Employee.findOne({ _id: decode.id });
        if (emp.designation === "Operations Manager") {
          req.emp = emp;
          next();
        } else if (emp.designation === "Branch Manager") {
          req.emp = emp;
          next();
        } else if (emp.designation === "Managing Director") {
          req.emp = emp;
          next();
        } else {
          return res.json({
            success: false,
            error: "You are not authorized to use this page!",
            message: "You are not authorized to use this page!",
          });
        }
      }
    } else {
      res.json({
        success: false,
        error: "You are not authorized to use this page!",
        message: "You are not authorized to use this page!",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error: error });
  }
};

async function onlyAdmin(req, res, next){
  // accessing new table
  try{
    const authorization = req.headers.authorization;
    
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      const decode = jwt.verify(token, process.env.secret);
      // console.log(decode.id, decode.email);

      if(decode.id){
        const emp = await Employee.findOne({_id: decode.id});
        const admin = await Admin.findOne({empId: decode.id});
        const director = await Director.findOne({empId: decode.id});
        if(emp){
          if(admin){
            console.log("You are an Admin");
            req.emp = emp;
            next();
          } else if(director) {
            console.log("You are the Director of Rudraksha !!");
            req.emp = emp;
            next();
          } else {
            console.log("You are a normal Employee !!");
            res.status(401).json({
              success: false,
              data: "Not an Admin",
              message: "Not Authorized !!"
            })
          }
        } else {
          console.log("No Records Found !!");
          res.status(400).json({
            success: false,
            data: "No records found for the ID in Employee !!",
            message: "Not Authorized !!"
          })
        }
      } else {
        console.log("No ID to decode !!");
        res.status(400).json({
          status: false,
          data: "No ID to be decoded",
          message: "Cannot Proceed !!"
        })
      }

    } else {
      res.status(401).json({
        status: false,
        data: "No Authorization Provided !!",
        message: "Cannot Proceed Further !!"
      })
    }
  }catch(e){
    console.log(e);
  }
}

module.exports = {
  adminAccess,
  authentication,
  costSheetApprovalAccess,
  onlyAdmin
};
