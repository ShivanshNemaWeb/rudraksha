const express = require("express");
const router = express.Router();

const {addToIVMS} = require("../controllers/ivms.controller");
const {onlyAdmin} = require("../middlewares/auth");

router.post("/add-to-IVMS", onlyAdmin, addToIVMS);

module.exports = router;