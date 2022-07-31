const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/auth");
const {
  AddCostSheet,
  getCostSheetByEventCode,
  updateCostSheet,
} = require("../controllers/costsheet");

router.post("/addcostsheet", authentication, AddCostSheet);
router.get("/getcostsheetdata/:eventId", getCostSheetByEventCode);
router.post("/updatecostsheet", authentication, updateCostSheet);

module.exports = router;
