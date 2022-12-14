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

  const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });

  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    const newUser = new User({ email, name, admin: false });
    await newUser.save();
  }
  res.send({ token });
});

module.exports = router;
