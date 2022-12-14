const express = require("express");
const mongoose = require("mongoose");
const serviceSchema = require("../Schema/serviceSchema");
const router = express.Router();
const Service = new mongoose.model("Service", serviceSchema);

router.get("/", async (req, res) => {
  const result = await Service.find({});
  res.send(result);
});

module.exports = router;
