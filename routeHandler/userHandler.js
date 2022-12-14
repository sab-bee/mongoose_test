const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("../Schema/userSchema");
const router = express.Router();
const User = new mongoose.model("User", userSchema);

router.get("/", async (req, res) => {
  const result = await User.find({});
  res.send(result);
});
module.exports = router;
