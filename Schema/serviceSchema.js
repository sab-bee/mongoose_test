const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  title: {
    type: String,
  },
  minAge: {
    type: Number,
  },
  minPremium: {
    type: Number,
  },
  policy: {
    type: Object,
  },
});

module.exports = serviceSchema;
