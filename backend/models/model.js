// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Create schema for todo
// const Survey = new Schema({
//   uname: {
//     type: String,
//     required: true,
//   },
//   age: { Number },
//   gender: { String },
//   email: { String },
//   contact: { String },
//   fathername: { String },
//   graduation: { Number },
//   degree: { Number },
//   experience: { String },
//   designation: { Boolean },
//   vac: { String },
//   resume: { String },
// });

// const Recruit = new Schema({
//   uname: {
//     type: String,
//     required: true,
//   },
//   age: { Number },
//   gender: { String },
//   email: { String },
//   contact: { Number },
//   fathername: { String },
//   graduation: { Number },
//   degree: { Number },
//   experience: { String },
//   designation: { String },
//   vac: { String },
//   resume: { String },
// });

// const RMS = new Schema({
//   UserName: { type: String, required: true },
//   Gender: { String },
//   Contact: { Number },
//   Objective: { String },
//   Guest: { String },
//   Employee: { String },
//   PI: { String },
//   TI: { String },
//   Add: { String },
//   remark: { String },
//   date: { date },
//   time: { String },
// });

// const Interview = new Schema({
//   uname: {
//     type: String,
//     required: true,
//   },
//   name: { string },
//   email: { string },
//   contact: { Number },
//   gender: { String },
//   marriedstatus: { String },
//   address: { String },
//   interviewdetails: { String },
//   interviewedby: { String },
//   department: { String },
//   interviewmode: { String },
//   interviewdate: { Number },
//   place: { String },
//   salaryoffered: { Number },
//   educationalqualificationsandexpertise: { String },
//   educationalbackground: { String },
//   priorworkexpierence: { String },
//   technicalexpertise: { String },
//   administrativeandbudgetaryexpierence: { Number },
//   leadershipability: { Number },
//   customerserviceskills: { Number },
//   communicationskills: { Number },
//   candidateenthusiasm: { Number },
//   overallimpressionsandrecommendation: { Number },
//   adhaarnumber: { Number },
//   pannumber: { Number },
//   remarks: { String },
// });
// const Joining = new Schema({
//   uname: {
//     type: String,
//     required: true,
//   },
//   name: { String },
//   age: { Number },
//   gender: { String },
//   email: { String },
//   contact: { Number },
//   father: { String },
//   Mother: { String },
//   blood: { String },
//   Address: { String },
//   University: { String },
//   deg: { String },
//   exp: { String },
//   desg: { String },
//   place: { String },
//   date: { Number },
//   bankname: { String },
//   acno: { Number },
//   IFSC: { Number },
//   branch: { String },
//   actype: { String },
//   wallet: { String },
// });

// // Create model for todo
// const Todo = mongoose.model("surveydb", Survey);
// const rec = mongoose.model("recdb", Recruit);
// const rms = mongoose.model("rmsdb", RMS);
// const interview = mongoose.model("interviewdb", Interview);
// const joining = mongoose.model("joiningdb", Joining);

// // module.exports = Surveydb;
