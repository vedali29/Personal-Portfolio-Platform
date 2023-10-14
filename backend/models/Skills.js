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
const Skills = mongoose.model("Skills", skillsSchema);
