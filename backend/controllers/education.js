const Profile = require("../models/Profile");
const Education = require("../models/Education");

// Create Education
exports.createEducation = async (req, res) => {
  try {
    // data fetch
    const { type, duration, grades, link, profileId } = req.body;

    // validate
    if (!type || !duration || !grades) {
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
    const newEducation = await Education.create({
      type: type,
      duration: duration,
      grades: grades,
      link: link,
    });

    // update projects in Profile schema with project ObjectID
    const updateProfileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        $push: {
          education: newEducation._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "education",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Education Created Successfully.",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating a Project, please try again.",
      error: error.message,
    });
  }
};

// Update Education
exports.updateEducation = async (req, res) => {
  try {
    // data fetch
    const { type, duration, grades, link, educationId, profileId } = req.body;

    // validate
    if (!type || !duration || educationId) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required details carefully",
      });
    }

    const updatedEducation = await Education.findByIdAndUpdate(
      educationId,
      {
        type: type,
        duration: duration,
        grades: grades,
        link: link,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "education",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Education Section Updated Successfully.",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while Updating a Education Section, please try again.",
      error: error.message,
    });
  }
};

// Delete Education
exports.deleteEducation = async (req, res) => {
  try {
    // data fetch (id)
    const { educationId, profileId } = req.body;

    // validate
    if (!educationId) {
      return res.status(404).json({
        success: false,
        message: "Education ID is not found.",
      });
    }

    await Education.findByIdAndDelete(educationId, { new: true });

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "education",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Education Section Deleted Successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting the Education, please try again.",
      error: error.message,
    });
  }
};

// Get Education
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "Education Fetched Successfully.",
      data: education,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching Education Details, please try again.",
      error: error.message,
    });
  }
};
