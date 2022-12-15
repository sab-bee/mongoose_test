const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
  /*   gender: {
    type: String,
    enum: ["male", "female"],

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
  habit: {
    type: String,
    enum: ["no", "drink", "smoke"],
  },
  maritalStatus: {
    type: String,
    enum: ["married", "single"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  }, */
});

module.exports = subscriptionSchema;
