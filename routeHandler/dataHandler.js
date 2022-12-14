const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dataSchema = require("../Schema/dataSchema");


const Data = new mongoose.model("Data", dataSchema);

router.get("/", async (req, res) => {
  res.send({ data: "data" });
});

module.exports = router;
