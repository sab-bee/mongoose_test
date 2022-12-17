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
  await User.updateOne({
    _id: userId
  },{
    $push: {
      subscriptions: result._id
    }
  })
  res.json(result);
});

module.exports = router;
