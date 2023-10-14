const Profile = require("../models/Profile");

require("dotenv").config();

exports.createProfile = async (req, res) => {
  try {
    const {jobTitle, website_url, github_link, twitter_link, instagram_url, linkedin_url}
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please fill all the details carefully",
    });
  }
};
