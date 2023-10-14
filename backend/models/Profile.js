const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  website_url: {
    type: String,
  },
  github_link: {
    type: String,
    required: true,
  },
  twitter_link: {
    type: String,
  },
  instagram_url: {
    type: String,
  },
  linkedin_url: {
    type: String,
    required: true,
  },
  other_links_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Links",
    required: true,
  },
  project_url: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
  },
  certification_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Certification",
  },
  experience_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
  },
  education_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Education",
    required: true,
  },
  otherExperience_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "otherExperienceSchema",
  },
  skills_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skills",
    required: true,
  },
  achievements_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Achievements",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
