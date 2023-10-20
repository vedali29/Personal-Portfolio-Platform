const Experience = require("../models/Experience");
const Profile = require("../models/Profile");
const Projects = require("../models/Projects");

// Create Experience
exports.createExperience = async (req, res) => {
  try {
    // data fetch
    const { title, company, duration, description, link, profileId } = req.body;

    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return res.status(400).json({
        success: false,
        message: "Profile not found!",
      });
    }

    // create project with given name
    const newExperience = await Experience.create({
      title: title,
      company: company,
      duration: duration,
      description: description,
      link: link,
    });

    // update projects in Profile schema with project ObjectID
    const updateProfileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        $push: {
          experiences: newExperience._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "experiences",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Experience Added Successfully.",
      data: updateProfileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating a Experience, please try again.",
      error: error.message,
    });
  }
};

// Update Experience
exports.updateExperience = async (req, res) => {
  try {
    // data fetch
    const {
      title,
      company,
      duration,
      description,
      link,
      experienceId,
      profileId,
    } = req.body;

    // validate
    if (
      !title ||
      !company ||
      !duration ||
      !description ||
      !link ||
      !experienceId
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required details carefully",
      });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      experienceId,
      {
        title: title,
        company: company,
        duration: duration,
        description: description,
        link: link,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "experiences",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Experience Updated Successfully.",
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

// Delete Experience
exports.deleteExperience = async (req, res) => {
  try {
    // data fetch (id)
    const { experienceId, profileId } = req.body;

    // validate
    if (!experienceId) {
      return res.status(404).json({
        success: false,
        message: "Experience ID is not found.",
      });
    }

    await Experience.findByIdAndDelete(experienceId, { new: true });

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "experiences",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Experience Deleted Successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting the Experience, please try again.",
      error: error.message,
    });
  }
};

// Get All Experiences
exports.getExperience = async (req, res) => {
  try {
    const allExperiences = await Experience.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "All Experiences Fetched Successfully.",
      data: allExperiences,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching all Experiences, please try again.",
      error: error.message,
    });
  }
};
