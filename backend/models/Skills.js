const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: String,
  level: {
    type: String,
    enum: ["Basic", "Intermediate", "Advanced"],
  },
});

const skillsSchema = new mongoose.Schema({
  hardSkills: [skillSchema],
  softSkills: [skillSchema],
});

module.exports = mongoose.model("Skills", skillsSchema);
