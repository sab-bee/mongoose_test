const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("../Schema/userSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = new mongoose.model("User", userSchema);

router.get("/", async (req, res) => {
  const result = await User.find({});
  res.send(result);
});

router.post("/:email", async (req, res) => {
  const email = req.params.email;
  const name = req.body.name;

  let userId = "";
  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    const newUser = new User({ email, name, admin: false });
    userId = newUser._id;
    await newUser.save();
  } else {
    userId = existedUser._id;
  }
  const token = jwt.sign({ email, userId }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
  res.send({ token });
});

router.get("/info/:email", async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  res.json(user);
});

module.exports = router;
