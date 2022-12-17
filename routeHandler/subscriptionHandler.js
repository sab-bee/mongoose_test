const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const subscriptionSchema = require("../Schema/subscriptionSchema");
const stripe = require("stripe")(
  "sk_test_51L1Dp8J48oi4JQCJyhjq2TZg7vh5Bo4en4eGu6JO7YxVRIvG9WOgPtl97krpaRMvXnarS3Ugb8fwzqlkeruHvAwD00xI566VEz"
);
const verifyUser = require("../middleware/verifyUser");
const router = express.Router();
const Subscription = new mongoose.model("Subscription", subscriptionSchema);

// router.options("/payment/:premium", cors());
// router.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

router.get("/payment/:premium", verifyUser, async (req, res) => {
  const premium = req.params.premium * 100;

  const paymentIntents = await stripe.paymentIntents.create({
    amount: premium,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.json({ clientSecret: paymentIntents.client_secret });
});

module.exports = router;
