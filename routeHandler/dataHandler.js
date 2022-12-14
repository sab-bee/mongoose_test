const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Data = new mongoose.model("Data");

router.get("/", async (req, res) => {
  res.send({ data: "data" });
});

module.exports = router;
