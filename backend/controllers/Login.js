const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are mandatory fields!");
    }
    if (email === process.env.ADMIN_USERNAME) {
      if (password != process.env.ADMIN_PASSWORD) {
        throw new Error("Passwords doesnt match!");
      }
      const token = jwt.sign({ email, password }, process.env.secret);
      res.status(200).json({
        success: true,
        token: token,
      });
    } else {
      const emp = await Employee.findOne({ email });
      if (!emp) {
        throw new Error("No employee with that email!");
      }
      const passwordMatch = await bcrypt.compare(password, emp.password);
      if (!passwordMatch) {
        throw new Error("Passwords doesnt match!");
      }
      const token = jwt.sign(
        { email: emp.email, id: emp._id },
        process.env.secret
      );
      res.status(200).json({
        success: true,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Something went wrong, try again later!",
    });
  }
};

const createEmployeeCredentials = async (req, res, next) => {
  try {
    const { empId, password } = req.body;
    if (!empId || !password) {
      return res.json({
        success: false,
        error: "Employee Id and password are mandatory fields",
        message: "Something went wrong, try again later!",
      });
    }
    const result = await Employee.findByIdAndUpdate(
      empId,
      {
        password: await bcrypt.hash(password, 12),
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Something went wrong, try again later!",
    });
  }
};

module.exports = {
  signIn,
  createEmployeeCredentials,
};
