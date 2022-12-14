const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dataSchema = require("../Schema/dataSchema");

const Data = new mongoose.model("Data", dataSchema);

router.get("/", async (req, res) => {
  const result = await Data.find({});
  res.send(result);
});

router.get("/greet", async (req, res) => {
  res.send({ hello: "greet" });
});

module.exports = router;
