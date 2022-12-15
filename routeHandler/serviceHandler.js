const express = require("express");
const mongoose = require("mongoose");
const serviceSchema = require("../Schema/serviceSchema");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const Service = new mongoose.model("Service", serviceSchema);
let globalUserName = "";
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
  globalUserName = userName;
  const policyData = await getPolicyData({ _id });
  const result = getPlan(policyData, userAge, coverage);
  res.send(result);
});

router.post("/package", async (req, res) => {
  const bio = req.body;
  const policyData = await getPolicyData(bio._id);
  const pacakge = getPackage(policyData, bio);
  res.send(pacakge);
});

async function getPolicyData(_id) {
  return await Service.findOne({ _id });
}

function getPlan(info, userAge, coverage) {
  let { minAge, minPremium, title, policy, _id } = info;
  userAge = Number(userAge);
  coverage = Number(coverage);

  const x = ((userAge * minPremium) / minAge) * (coverage / 5000000);

  return {
    title,
    premium: x,
    policy,
    _id,
  };
}

function getPackage(policyData, bio) {
  const { minAge, minPremium } = policyData;
  const serviceName = policyData.title.split(" ")[0];

  const coverage = Number(bio.coverage);
  const yearlyIncome = Number(bio.yearlyIncome);
  const monthlySpend = Number(bio.monthlySpend);
  const userAge = Number(bio.userAge);

  let { gender, habit, maritalStatus } = bio;
  gender = gender == "male" ? 0.4 : 0.2;
  maritalStatus = maritalStatus == "married" ? 0.35 : 0;
  if (habit == "drink") {
    habit = 0.35;
  } else if (habit == "smoke") {
    habit = 0.3;
  } else {
    habit = 0;
  }

  let extra = gender + habit + maritalStatus;
  if (extra < 1) extra = 1;

  const x =
    ((userAge * minPremium) / minAge) *
    (coverage / 5000000) *
    (yearlyIncome / 1000000) *
    (monthlySpend / 30000) *
    extra;
  return {
    premium: Math.ceil(x),
  };
}

module.exports = router;
