const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  company: {
    type: String,
  },
  duration: {
    type: String,
  },
  description: {
    type: String,
  }, 
  link: {
    type: String,
  },
});

module.exports = mongoose.model("Experience", experienceSchema);
