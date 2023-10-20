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
  other_links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Links",
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
  ],
  certifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certification",
    },
  ],
  experiences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
    },
  ],
  education: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Education",
      required: true,
    },
  ],
  otherExperiences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "otherExperienceSchema",
    },
  ],
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
      required: true,
    },
  ],
  achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievements",
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
