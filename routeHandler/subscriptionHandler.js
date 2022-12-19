const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const subscriptionSchema = require("../Schema/subscriptionSchema");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const verifyUser = require("../middleware/verifyUser");
const userSchema = require("../Schema/userSchema");
const router = express.Router();
const Subscription = new mongoose.model("Subscription", subscriptionSchema);
const User = new mongoose.model("User", userSchema);

router.get("/payment/:premium", verifyUser, async (req, res) => {
  const premium = req.params.premium * 100;
  const paymentIntents = await stripe.paymentIntents.create({
    amount: premium,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntents.client_secret });
});

router.post("/payment/save", verifyUser, async (req, res) => {
  const checkout = req.body;
  const { userId } = req.decoded;
  const newSubscription = new Subscription({
    ...checkout,
    user: userId,
  });

  const result = await newSubscription.save();
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $push: {
        subscription: result._id,
      },
    }
  );
  res.json(result);
});

// get cant have triple slash value e:g -> /subscription/payment/paid
router.get("/approved", verifyUser, async (req, res) => {
  const { userId } = req.decoded;
  const user = await User.findOne({ _id: userId }).populate("subscription");
  res.json(user);
});

router.get("/individual", verifyUser, async (req, res) => {
  const userId = req.decoded.userId;
  const packages = await Subscription.find({ user: userId });
  res.send(packages);
});

// task:  verify admin
router.get("/all_pending", verifyUser, async (req, res) => {
  const packages = await Subscription.find({ approved: false });
  res.send(packages);
});

// task:  verify admin

router.post("/approve/:id", verifyUser, async (req, res) => {
  await Subscription.updateOne({ _id: req.params.id }, { approved: true });
  res.json({ success: true });
});

router.post("/pay/:id", verifyUser, async (req, res) => {
  await Subscription.updateOne({ _id: req.params.id }, req.body);
  res.json({ success: true });
});
module.exports = router;
