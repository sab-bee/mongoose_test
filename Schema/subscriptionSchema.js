const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
  paid: {
    type: Boolean,
  },
  approved: {
    type: Boolean,
  },
  transactionId: {
    type: String,
  },
  email: {
    type: String,
  },
  packageId: {
    type: String,
  },
  premium: {
    type: Number,
  },
  packageName: {
    type: String,
  },
  userAge: {
    type: Number,
  },
  coverage: {
    type: Number,
  },
  yearlyIncome: {
    type: Number,
  },
  monthlySpend: {
    type: Number,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = subscriptionSchema;
