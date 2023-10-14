const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Certification", certificationSchema);
