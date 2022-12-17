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
  pacakgeId: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = subscriptionSchema;