const CostSheet = require("../models/costsheet");
const Event = require("../models/event");
var ObjectId = require("mongoose").Types.ObjectId;
const AddCostSheet = async (req, res, next) => {
  try {
    const costsheetData = await CostSheet.create({
      costSheet: req.body.costSheet,
      eventId: req.body.eventId,
      empId: req.emp.id,
    });
    const upadteEventBudget = await Event.findByIdAndUpdate(
      req.body.eventId,
      {
        budgetedCost: req.body.budgetedAmount,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      success: true,
      ...costsheetData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Some Error Occured, Please Try Again!",
      error: error.message,
    });
  }
};

const getCostSheetByEventCode = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    if (!eventId || !ObjectId.isValid(eventId)) {
      return res.status(201).json({
        success: true,
      });
    }
    const costsheetData = await CostSheet.findOne({ eventId });
    if (!costsheetData) {
      return res.status(201).json({
        success: true,
      });
    }
    const eventDetails = await Event.find({ _id: eventId });
    res.status(201).json({
      success: true,
      costsheetData,
      eventDetails,
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

const updateCostSheet = async (req, res, next) => {
  try {
    const updatedCostSheet = await CostSheet.findByIdAndUpdate(
      req.body.costsheetId,
      {
        costSheet: JSON.parse(req.body.costSheet),
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      data: updatedCostSheet,
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
  AddCostSheet,
  getCostSheetByEventCode,
  updateCostSheet,
};
