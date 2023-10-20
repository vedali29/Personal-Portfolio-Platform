const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  grades: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("Education", educationSchema);
