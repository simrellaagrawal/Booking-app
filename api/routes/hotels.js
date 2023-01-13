const express = require("express");
const Hotel = require("../Schema/Hotel.js");
const router = express.Router();
// const { createHotel } = require("../controllers/hotel.js");
//create
// router.post("/",createHotel); //  or you can controlit by using controller folder
router.post("/", async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
    // console.log(savedHotel);
  } catch (err) {
    next(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all
router.get("/", async (req, res, next) => {
  const failed = true;

  // if(failed){
  //   return next(createError(401 , "you are not authenticated"));
  // }

  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
    // console.log(hotels)
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
});
module.exports = router;
