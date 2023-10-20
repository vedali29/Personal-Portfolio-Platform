const OtherExperience = require("../models/OtherExperience");
const Profile = require("../models/Profile");
const Projects = require("../models/Projects");
const User = require("../models/User");

// Create Other Experience Section
exports.createOtherExperience = async (req, res) => {
  try {
    // data fetch
    const { title, description, link, type, profileId } = req.body;

    // validate
    if (!profileId) {
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
    const newOtherExperience = await OtherExperience.create({
      title: title,
      description: description,
      link: link,
    });

    // update projects in Profile schema with project ObjectID
    const updateProfileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        $push: {
          otherExperiences: newOtherExperience._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "otherExperiences",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Another Experience Added Successfully.",
      data: updateProfileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating a another Experience, please try again.",
      error: error.message,
    });
  }
};

// Update Other Experience Section
exports.updateOtherExperience = async (req, res) => {
  try {
    // data fetch
    const { title, description, link, type, otherExperienceId, profileId } =
      req.body;

    // validate
    if (!title || !description || !link || !type || !otherExperienceId) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required details carefully.",
      });
    }

    const updatedOtherExperience = await OtherExperience.findByIdAndUpdate(
      otherExperienceId,
      {
        title: title,
        description: description,
        link: link,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "otherExperiences",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Other Experience Updated Successfully.",
      updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while Updating a Other Experience, please try again.",
      error: error.message,
    });
  }
};

// Delete Other Experience Section
exports.deleteOtherExperience = async (req, res) => {
  try {
    // data fetch (id)
    const { otherExperienceId, profileId } = req.body;

    // validate
    if (!otherExperienceId) {
      return res.status(404).json({
        success: false,
        message: "Other Experience ID is not found.",
      });
    }

    await OtherExperience.findByIdAndDelete(otherExperienceId, { new: true });

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "otherExperienceId",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Other Experience Deleted Successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting the Other Experience, please try again.",
      error: error.message,
    });
  }
};

// Get All OtherExperiences
exports.getOtherExperience = async (req, res) => {
  try {
    const otherExperiences = await OtherExperience.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "Other Experiences Fetched Successfully.",
      data: otherExperiences,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching Other Experiences, please try again.",
      error: error.message,
    });
  }
};
