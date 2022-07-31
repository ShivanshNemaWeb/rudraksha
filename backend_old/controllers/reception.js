const Reception = require("../models/reception");
const addReceptionGuest = async (req, res, next) => {
  try {
    const date = new Date();
    function pad(d) {
      return d < 10 ? "0" + d.toString() : d.toString();
    }
    const year = date.getFullYear().toString();
    const guestcode = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(
      date.getDate()
    )}${pad(date.getMonth())}${year[2]}${year[3]}`;
    const guest = new Reception({
      ...req.body,
      photo: req.file.buffer,
      guestcode,
      addedBy: req.emp._id,
    });

    await guest.save();
    res.status(201).json({
      success: true,
      data: guest,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Some Error Occured Please try again later!",
    });
  }
};

const updateReceptionTime = async (req, res, next) => {
  try {
    const { guestcode, outtime } = req.body;
    if (!guestcode || !outtime)
      throw new Error("Guest code and out time are mandatory fields!");
    const guest = await Reception.findOneAndUpdate(
      { guestcode },
      {
        outtime,
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      data: guest,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Some Error Occured Please try again later!",
    });
  }
};

const getAllCodes = async (req, res, next) => {
  try {
    //get all codes from Reception master table
    //send only name, phno, gender, photo buffer, accompanies, purpose, remarks
    //it shld be a array of objects
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
      message: "Some Error Occured Please try again later!",
    });
  }
};

module.exports = {
  addReceptionGuest,
  updateReceptionTime,
};
