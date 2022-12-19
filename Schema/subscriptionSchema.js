const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
  paid: {
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
  amount: {
    type: Number,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = subscriptionSchema;
