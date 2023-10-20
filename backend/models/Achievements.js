const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("Achievements", achievementSchema);
