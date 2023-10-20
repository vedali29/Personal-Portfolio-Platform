const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  project_title: {
    type: String,
    required: true,
    trim: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  techstack: {
    type: String,
  },
  project_link: {
    type: String,
  },
});

module.exports = mongoose.model("Projects", projectsSchema);
