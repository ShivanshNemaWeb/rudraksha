const express = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
// const recordRoutes= require('../backend/routes/api');
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
// app.use(require("./routes/api"));

// app.use('/RMSData', recRoutes);

// get driver connection
// const dbo = require("./database/connection");
// const recordRoutes = require("./routes/api");
// app.use("/RMSData", recordRoutes);

//routes for crm page
const employeeRoutes = require("./routes/employee");
const vendorRoutes = require("./routes/vendor");
const eventRoutes = require("./routes/event");
const costsheetRoutes = require("./routes/costsheet");
const loginRoutes = require("./routes/login");
const receptionRoutes = require("./routes/reception");
const attendanceRoutes = require("./routes/attendance");
const leaveRoutes = require("./routes/Lms");
app.use("/api/employee", employeeRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/costsheet", costsheetRoutes);
app.use("/api/", loginRoutes);
app.use("/api", require("./routes/admin.routes"));
app.use("/api/reception", receptionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/lms", leaveRoutes);
//http://localhost:5000/api/employees/getEmployees
app.use("/api/ivms", require("./routes/ivms.routes"));
app.use("/api/nms", require("./routes/nms-empTrack.routes"));
app.use("/api/salesms", require("./routes/salesMS.routes"));
app.use("/api/memo", require("./routes/memo.routes"));

// reports apis
app.use("/api/reports", require("./reports/employeeDetails"));
app.use("/api/reports", require("./reports/ivms.reports"));
app.use("/api/reports", require("./reports/nms.reports"));
app.use("/api/reports", require("./reports/donation.reports"));
app.use("/api/reports", require("./reports/sales.reports"));
app.use("/api/reports", require("./reports/pms.reports"));

const ConnectDB = require("./database/connection");
//connection to db
ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Not Connected to database");
  });
