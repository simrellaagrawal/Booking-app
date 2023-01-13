const express = require("express");
const User = require("../Schema/User.js");
const {verifyToken, verifyUser} = require("../utils/verifyToken.js");
const router = express.Router();
// const { createUser } = require("../controllers/user.js");
//create

// router.post("/",createUser); or you can controlit by using controller folder
// router.post("/", async (req, res, next) => {
//   const newUser = new User(req.body);
//   try {
//     const savedUser = await newUser.save();
//     res.status(200).json(savedUser);
//     // console.log(savedUser);
//   } catch (err) {
//     next(err);
//   }
// });


router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello User , you are logged in");
});
router.get("/checkuser/:id",verifyUser , (req, res, next) => {
    res.send("hello User , you are logged in and you can delete your account");
});
//update

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
// get
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all
router.get("/", async (req, res, next) => {
  //const failed = true;
  // if(failed){
  //   return next(createError(401 , "you are not authenticated"));
  // }

  try {
    const users = await User.find();
    res.status(200).json(users);
    // console.log(users)
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
});
module.exports = router;
