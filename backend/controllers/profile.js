const Profile = require("../models/Profile");
const User = require("../models/User");

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    // data fetch
    const {
      jobTitle,
      website_url,
      github_link,
      twitter_link,
      instagram_url,
      linkedin_url,
    } = req.body;

    const userId = req.user.id;

    // validate
    if (!jobTitle || !github_link || !linkedin_url) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required details carefully",
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profile,
      {
        project_title: project_title,
        project_description: project_description,
        project_link: project_link,
        techstack: techstack,
      },
      { new: true }
    );

    const updatedUser = await User.findById(userId)
      .populate({
        path: "profileDetails",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully.",
      updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while Updating a Project, please try again.",
      error: error.message,
    });
  }
};

// Update Profile -> handler
exports.updateProfile = async (req, res) => {
  try {
    // data fetch
    const {
      jobTitle,
      website_url,
      github_link,
      twitter_link,
      instagram_url,
      linkedin_url,
    } = req.body;

    const userId = req.user.id;

    // validate
    if (!jobTitle || !github_link || !linkedin_url) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required details carefully",
      });
    }

    const userDetails = await User.findById(userId);
    const profileId = userDetails.profile_id;
    const profileDetails = await Profile.findById(profileId);

    // update profile
    profileDetails.jobTitle = jobTitle;
    profileDetails.website_url = website_url;
    profileDetails.github_link = github_link;
    profileDetails.twitter_link = twitter_link;
    profileDetails.instagram_url = instagram_url;
    profileDetails.linkedin_url = jobTitle;

    await profileDetails.save();

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully.",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating a Profile, please try again.",
      error: error.message,
    });
  }
};

// Get All Profile Details
exports.getProfile = async (req, res) => {
  try {
    const profileDetails = await Profile.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile Details Fetched Successfully.",
      data: profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching all Profile, please try again.",
      error: error.message,
    });
  }
};
