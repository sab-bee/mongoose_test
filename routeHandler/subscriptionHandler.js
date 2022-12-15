const express = require("express");
const mongoose = require("mongoose");
const subscriptionSchema = require("../Schema/subscriptionSchema");

const router = express.Router();
const Subscription = new mongoose.model("Subscription", subscriptionSchema);

router.post("/package", async (req, res) => {
  
});

module.exports = router;
