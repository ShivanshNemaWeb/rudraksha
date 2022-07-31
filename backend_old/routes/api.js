// const express = require("express");

// // recordRoutes is an instance of the express router.
// // We use it to define our routes.
// // The router will be added as a middleware and will take control of requests starting with path /record.
// const recordRoutes = express.Router();

// // This will help us connect to the database
// const dbo = require("../database/connection");

// // This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

// // This section will help you get a list of all the records.
// recordRoutes.route("/record").get(function (req, res) {
//   let db_connect = dbo.getDb("RMSData");
//   db_connect
//     .collection("RMSData")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// // This section will help you get a list of all the records in intervw.
// recordRoutes.route("/record-interview").get(function (req, res) {
//   let db_connect = dbo.getDb("interview");
//   db_connect
//     .collection("interview")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// // This section will help you get a list of all the records in joining.
// recordRoutes.route("/record-join").get(function (req, res) {
//   let db_connect = dbo.getDb("joining");
//   db_connect
//     .collection("joining")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// // This section will help you get a single record by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect.collection("records").findOne(myquery, function (err, result) {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// // This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     // name: req.body.name,
//     // position: req.body.position,
//     // level: req.body.level,
//     inputName: req.body.inputName,
//     inputAge: req.body.inputAge,
//     inputGender: req.body.inputGender,
//     inputprofession: req.body.inputprofession,
//     inputeabrand: req.body.inputeabrand,
//     inputteaProduct: req.body.inputteaProduct,
//     inputteaprice: req.body.inputteaprice,
//     inputQty: req.body.inputQty,
//     inputTaste: req.body.inputTaste,
//     inlineRadio1: req.body.inlineRadio1,
//     inlineRadio2: req.body.inlineRadio2,
//     inputSiddhiquality: req.body.inputSiddhiquality,
//     inputSiddhiPrice: req.body.inputSiddhiPrice,
//   };
//   db_connect.collection("survey").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// //This section is for recruitment form data entry
// recordRoutes.route("/recruit/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj1 = {
//     RecUserName: req.body.RecUserName,
//     RecUserAge: req.body.RecUserAge,
//     RecUserGender: req.body.RecUserGender,
//     RecUserEmail: req.body.RecUserEmail,
//     RecUserContact: req.body.RecUserContact,
//     RecUserFather: req.body.RecUserFather,
//     RecUserGrad: req.body.RecUserGrad,
//     RecUserDeg: req.body.RecUserDeg,
//     RecUserExp: req.body.RecUserExp,
//     RecUserDesg: req.body.RecUserDesg,
//     RecUserVaccination: req.body.RecUserVaccination,
//     RecUserVac: req.body.RecUserVac,
//     RecUserResume: req.body.RecUserResume,
//   };
//   db_connect.collection("recruits").insertOne(myobj1, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// //This section is for rms
// recordRoutes.route("/rms/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let date_ob = new Date();
//   let hours = date_ob.getHours();
//   let minutes = date_ob.getMinutes();
//   let seconds = date_ob.getSeconds();
//   let date = ("0" + date_ob.getDate()).slice(-2);
//   let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
//   let year = date_ob.getFullYear();

//   let myobj2 = {
//     RMSUserName: req.body.RMSUserName,
//     RMSUserGender: req.body.RMSUserGender,
//     RMSUserContact: req.body.RMSUserContact,
//     RMSUserObjective: req.body.RMSUserObjective,
//     RMSUserGuest: req.body.RMSUserGuest,
//     RMSUserEmployee: req.body.RMSUserEmployee,
//     RMSUserPI: req.body.RMSUserPI,
//     RMSUserTI: req.body.RMSUserTI,
//     RMSUserAdd: req.body.RMSUserAdd,
//     RMSUserremark: req.body.RMSUserremark,
//     RMSUserTime: hours + ":" + minutes + ":" + seconds,
//     RMSUserDate: date + "-" + month + "-" + year,
//   };
//   db_connect.collection("RMSData").insertOne(myobj2, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// recordRoutes.route("/interview/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj2 = {
//     InterviewUserName: req.body.InterviewUserName,
//     InterviewUserEmail: req.body.InterviewUserEmail,
//     InterviewUserContact: req.body.InterviewUserContact,
//     InterviewUserGender: req.body.InterviewUserGender,
//     InterviewUserGender: req.body.InterviewUserGender,
//     InterviewUserAdd: req.body.InterviewUserAdd,
//     InterviewIName: req.body.InterviewIName,
//     InterviewIdepartment: req.body.InterviewIdepartment,
//     InterviewType: req.body.InterviewType,
//     InterviewIdate: req.body.InterviewIdate,
//     InterviewIplace: req.body.InterviewIplace,
//     InterviewIsalary: req.body.InterviewIsalary,
//     InterviewEdu: req.body.InterviewEdu,
//     InterviewWorkE: req.body.InterviewWorkE,
//     InterviewExpertise: req.body.InterviewExpertise,
//     InterviewQ1R1: req.body.InterviewQ1R1,
//     InterviewQ1R2: req.body.InterviewQ1R2,
//     InterviewQ1R3: req.body.InterviewQ1R3,
//     InterviewQ1R4: req.body.InterviewQ1R4,
//     InterviewQ1R5: req.body.InterviewQ1R5,
//     InterviewQ2R1: req.body.InterviewQ2R1,
//     InterviewQ2R2: req.body.InterviewQ2R2,
//     InterviewQ2R3: req.body.InterviewQ2R3,
//     InterviewQ2R4: req.body.InterviewQ2R4,
//     InterviewQ2R5: req.body.InterviewQ2R5,
//     InterviewQ3R1: req.body.InterviewQ3R1,
//     InterviewQ3R2: req.body.InterviewQ3R2,
//     InterviewQ3R3: req.body.InterviewQ3R3,
//     InterviewQ3R4: req.body.InterviewQ3R4,
//     InterviewQ3R5: req.body.InterviewQ3R5,
//     InterviewQ4R1: req.body.InterviewQ4R1,
//     InterviewQ4R2: req.body.InterviewQ4R2,
//     InterviewQ4R3: req.body.InterviewQ4R3,
//     InterviewQ4R4: req.body.InterviewQ4R4,
//     InterviewQ4R5: req.body.InterviewQ4R5,
//     InterviewQ5R1: req.body.InterviewQ5R1,
//     InterviewQ5R2: req.body.InterviewQ5R2,
//     InterviewQ5R3: req.body.InterviewQ5R3,
//     InterviewQ5R4: req.body.InterviewQ5R4,
//     InterviewQ5R5: req.body.InterviewQ5R5,
//     InterviewQ6R1: req.body.InterviewQ6R1,
//     InterviewQ6R2: req.body.InterviewQ6R2,
//     InterviewQ6R3: req.body.InterviewQ6R3,
//     InterviewQ6R4: req.body.InterviewQ6R4,
//     InterviewQ6R5: req.body.InterviewQ6R5,
//     InterviewUserAdhaar: req.body.InterviewUserAdhaar,
//     InterviewUserPan: req.body.InterviewUserPan,
//     InterviewRemarks: req.body.InterviewRemarks,
//   };
//   db_connect.collection("interview").insertOne(myobj2, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// recordRoutes.route("/joining/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj3 = {
//     JoiningUserName: req.body.JoiningUserName,
//     JoiningUserAge: req.body.JoiningUserAge,
//     JoiningUserGender: req.body.JoiningUserGender,
//     JoiningUserGender: req.body.JoiningUserGender,
//     JoiningUserEmail: req.body.JoiningUserEmail,
//     JoiningUserContact: req.body.JoiningUserContact,
//     JoiningUserFather: req.body.JoiningUserFather,
//     JoiningUserMother: req.body.JoiningUserMother,
//     JoiningUserBlood: req.body.JoiningUserBlood,
//     JoiningUserAdd: req.body.JoiningUserAdd,
//     JoiningUserUniversity: req.body.JoiningUserUniversity,
//     JoiningUserDeg: req.body.JoiningUserDeg,
//     JoiningUserExp: req.body.JoiningUserExp,
//     JoiningUserDesg: req.body.JoiningUserDesg,
//     JoiningUserDesg: req.body.JoiningUserDesg,
//     JoiningUserDesg: req.body.JoiningUserDesg,
//     JoiningUserDesg: req.body.JoiningUserDesg,
//     JoiningUserDesg: req.body.JoiningUserDesg,
//     JoiningUserDesg: req.body.JoiningUserDesg,
//     JoiningUserPlace: req.body.JoiningUserPlace,
//     JoiningUserDate: req.body.JoiningUserDate,
//     JoiningUserBankName: req.body.JoiningUserBankName,
//     JoiningUserAcno: req.body.JoiningUserAcno,
//     JoiningUserIFSC: req.body.JoiningUserIFSC,
//     JoiningUserBranch: req.body.JoiningUserBranch,
//     JoiningUserAcType: req.body.JoiningUserAcType,
//     JoiningUserWallet: req.body.JoiningUserWallet,
//   };
//   db_connect.collection("joining").insertOne(myobj3, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });

//   // This section will help you update a record by id.
//   recordRoutes.route("/update/:id").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     let newvalues = {
//       $set: {
//         name: req.body.name,
//         position: req.body.position,
//         level: req.body.level,
//       },
//     };

//     // This section will help you delete a record
//     recordRoutes.route("/:id").delete((req, response) => {
//       let db_connect = dbo.getDb();
//       let myquery = { _id: ObjectId(req.params.id) };
//       db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//         if (err) throw err;
//         console.log("1 document deleted");
//         response.json(obj);
//       });
//     });
//   });
// });
// module.exports = recordRoutes;
