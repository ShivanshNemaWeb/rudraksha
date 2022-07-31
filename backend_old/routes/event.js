const express = require("express");
const router = express.Router();
const {
  AddEvent,
  getEvent,
  getEventCodes,
  getEventsOfEmp,
  eventapproval,
  getAllEvents,
} = require("../controllers/event");
const {
  authentication,
  costSheetApprovalAccess,
} = require("../middlewares/auth");

router.post("/approveEvent", costSheetApprovalAccess, eventapproval);
router.post("/addEvent", authentication, AddEvent);

router.get("/getEvent/:eventabbreviation", getEvent);
router.get("/getEventCodes/:projectHead", getEventCodes);
router.get("/geteventsofuser", authentication, getEventsOfEmp);
router.get("/getAllEvents", costSheetApprovalAccess, getAllEvents);
module.exports = router;
