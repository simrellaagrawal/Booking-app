const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const hotelRoute = require("./routes/hotels.js");
const roomRoute = require("./routes/rooms.js");
const userRoute = require("./routes/users.js");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const mongourl =
  "mongodb+srv://SimrellaAgrawal:SimrellaAgrawal@project1.a3oey8d.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongourl, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected successfull");
  }
});

app.get("/", (req, res) => {
  res.send("first response");
});
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  console.log("server is working on port 8000");
});
