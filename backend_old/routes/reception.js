const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authentication } = require("../middlewares/auth");
const { addReceptionGuest } = require("../controllers/reception");

const uploads = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(".[jpg|jpeg|png]$")) {
      return cb(new Error("Upload jpg, jpeg, png"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/addReceptionGuest",
  authentication,
  uploads.single("photo"),
  addReceptionGuest
);

module.exports = router;
