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
  getPackage(policyData, bio);
  res.send({ hello: "hi" });
});

async function getPolicyData(_id) {
  return await Service.findOne({ _id });
}

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

function getPackage(policyData, bio) {
  const name = policyData.title.split(" ")[0];
  console.log(bio);
  
  const coverage = Number(bio.coverage);
  const yearlyIncome = Number(bio.yearlyIncome);
  const monthlySpend = Number(bio.monthlySpend);
  const { gender, habit, maritalStatus } = bio;

  const { minAge, minPremium } = policyData;

  if (name === "term") {
    // const x = ((userAge * minPremium) / minAge) * (coverage / 10000000);
  }
}

module.exports = router;
