const express = require("express");
const mongoose = require("mongoose");
const serviceSchema = require("../Schema/serviceSchema");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const Service = new mongoose.model("Service", serviceSchema);

router.get("/", async (req, res) => {
  const result = await Service.find({});
  res.send(result);
});

router.get("/service/:id", verifyUser, async (req, res) => {
  const query = { _id: req.params.id };
  if (query._id.length !== 24)
    return res.status(404).send({ err: "invalid service id" });
  const result = await Service.findOne(query);
  res.send(result);
});

router.post("/insurance/:email", async (req, res) => {
  const email = req.params.email;
  const { userName, userAge, coverage, _id } = req.body;

  const policyData = await Service.findOne({ _id });
  const result = getPlan(policyData, userAge, coverage);
  res.send(result);
});

function getPlan(info, userAge, coverage) {
  let { minAge, minPremium, title, policy, _id } = info;
  userAge = Number(userAge);
  coverage = Number(coverage);

  const x = ((userAge * minPremium) / minAge) * (coverage / 10000000);

  return {
    title,
    premium: x,
    policy,
    _id,
  };
}

module.exports = router;
