const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  certification_url: {
    type: String,
  },
  certification_title: {
    type: String,
  },
  certification_description: {
    type: String,
  },
});

module.exports = mongoose.model("Certification", certificationSchema);
