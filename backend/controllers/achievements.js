const Achievements = require("../models/Achievements");
const Profile = require("../models/Profile");
const Projects = require("../models/Projects");

// Create Achievement
exports.createAchievement = async (req, res) => {
  try {
    // data fetch
    const { title, field, description, link, profileId } = req.body;

    // validate
    if (!title || !field || !description || !link || !profileId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required. Please fill all the details.",
      });
    }

    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return res.status(400).json({
        success: false,
        message: "Profile not found!",
      });
    }

    // create project with given name
    const newAchievement = await Achievements.create({
      title: title,
      field: field,
      description: description,
      link: link,
    });

    // update projects in Profile schema with project ObjectID
    const updateProfileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        $push: {
          achievements: newAchievement._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "achievements",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Achievement Added Successfully.",
      data: updateProfileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating a Achievement, please try again.",
      error: error.message,
    });
  }
};

// Update Achievement
exports.updateAchievement = async (req, res) => {
  try {
    // data fetch
    const { title, field, description, link, achievementId, profileId } =
      req.body;

    // validate
    if (!title || !field || !description || !achievementId) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required details carefully",
      });
    }

    const updatedProject = await Projects.findByIdAndUpdate(
      projectId,
      {
        title: title,
        field: field,
        description: description,
        link: link,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "achievements",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Achievements Updated Successfully.",
      updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while Updating a Achievement, please try again.",
      error: error.message,
    });
  }
};

// Delete Achievement
exports.deleteAchievement = async (req, res) => {
  try {
    // data fetch (id)
    const { achievementId, profileId } = req.body;

    // validate
    if (!achievementId) {
      return res.status(404).json({
        success: false,
        message: "Achievement ID is not found.",
      });
    }

    await Achievements.findByIdAndDelete(achievementId, { new: true });

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "achievements",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Achievement Deleted Successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting the Achievement, please try again.",
      error: error.message,
    });
  }
};

// Get All Achievement
exports.getAchievement = async (req, res) => {
  try {
    const achievements = await Projects.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "All Achievements Fetched Successfully.",
      data: achievements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching all Achievements, please try again.",
      error: error.message,
    });
  }
};
