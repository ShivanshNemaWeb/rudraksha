const Event = require("../models/event");

const AddEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      empId: req.emp.id,
    });
    res.status(201).json({
      success: true,
      data: event,
      message: "Vendor Details Succesfully Added!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const getEvent = async (req, res, next) => {
  try {
    if (!req.params.eventabbreviation) {
      throw new Error("Invalid API Call without event abbreviation!");
    }

    //for retreiving last event details which will give us last event number
    const data = await Event.find({}).sort({ eventNumber: -1 }).limit(1);

    //for retreiving last event with given project name which will give us the
    // event number for that project(e.g: blood donation)
    const result = await Event.find({
      eventAbbreviation: req.params.eventabbreviation,
    })
      .sort({ projectNumber: -1 })
      .limit(1);

    res.json({
      success: true,
      eventNumber: data[0] ? data[0].eventNumber : 0,
      projectNumber: result[0] ? result[0].projectNumber : 0,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const getEventCodes = async (req, res, next) => {
  try {
    console.log("here");
    const { projectHead } = req.params;
    console.log("3");
    const data = await Event.find(
      { projectHead },
      {
        projectName: 0,
        eventNumber: 0,
        Allvendors: 0,
        actualCost: 0,
        branchName: 0,
        remarks: 0,
        eventAbbreviation: 0,
        projectNumber: 0,
      }
    );
    console.log(data);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something Went Wrong, Try Again!",
      error: error.message,
    });
  }
};
const getEventsOfEmp = async (req, res, next) => {
  try {
    const events = await Event.find({ empId: req.emp._id });
    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something Went Wrong, Try Again!",
      error: error.message,
    });
  }
};

const eventapproval = async (req, res, next) => {
  try {
    const { eventId, status } = req.body;
    const update = await Event.findByIdAndUpdate(
      eventId,
      {
        status,
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      data: update,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Some Error Occured, Please Try Again!",
      error: error.message,
    });
  }
};

//getting all events to show for approving
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Some Error Occured, Please Try Again!",
      error: error.message,
    });
  }
};

module.exports = {
  AddEvent,
  getEvent,
  getEventCodes,
  getEventsOfEmp,
  eventapproval,
  getAllEvents,
};
