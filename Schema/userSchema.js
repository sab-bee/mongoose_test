const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  admin: {
    type: Boolean,
    // required: true,
  },
  subscription: {
    type: mongoose.Types.ObjectId,
    ref: "Subscription",
  },
});

module.exports = userSchema;
