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
});

module.exports = userSchema;
