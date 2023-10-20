const Profile = require("../models/Profile");
const Skills = require("../models/Skills");

// Create Skill
exports.createSkill = async (req, res) => {
  try {
    // data fetch
    const { softSkills, hardSkills, profileId } = req.body;

    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return res.status(400).json({
        success: false,
        message: "Profile not found!",
      });
    }

    // create skill with given name
    const newSkill = await Skills.create({
      hardSkills: hardSkills,
      softSkills: softSkills,
    });

    // update skills in Profile schema with project ObjectID
    const updateProfileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        $push: {
          skills: newSkill._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "projects",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Skill Added Successfully.",
      data: updateProfileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding a Skill, please try again.",
      error: error.message,
    });
  }
};

// Update Skill
exports.updateSkill = async (req, res) => {
  try {
    // data fetch
    const { softSkills, hardSkills, skillId, profileId } = req.body;

    // validate
    if (!skillId) {
      return res.status(401).json({
        success: false,
        message: "Skill ID Not Found",
      });
    }

    const updatedSkill = await Skills.findByIdAndUpdate(
      skillId,
      {
        hardSkills: hardSkills,
        softSkills: softSkills,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "skills",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Skills Updated Successfully.",
      updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Updating a Skill, please try again.",
      error: error.message,
    });
  }
};

// Delete Skill
exports.deleteSkill = async (req, res) => {
  try {
    // data fetch (id)
    const { skillId, profileId } = req.body;

    // validate
    if (!skillId) {
      return res.status(404).json({
        success: false,
        message: "Skill ID is not found.",
      });
    }

    await Skills.findByIdAndDelete(skillId, { new: true });

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "skills",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Skill Deleted Successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting a Skill, please try again.",
      error: error.message,
    });
  }
};

// Get All Projects
exports.getSkills = async (req, res) => {
  try {
    const allSkills = await Skills.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "All Skills Fetched Successfully.",
      data: allSkills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching all Skills, please try again.",
      error: error.message,
    });
  }
};
