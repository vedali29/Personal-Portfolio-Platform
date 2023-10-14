const mongoose = require("mongoose");

const linksSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  link_title: {
    type: String,
    required: true,
  },
  link_url: {
    type: String,
    required: true,
  },
  link_description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Links", linksSchema);
