const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

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

module.exports = {
  adminAccess,
  authentication,
  costSheetApprovalAccess,
};
