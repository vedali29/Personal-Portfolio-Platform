const mongoose = require("mongoose");

const otherExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  }, 
  link: {
    type: String,
  },
});

module.exports = mongoose.model("Experience", otherExperienceSchema);
