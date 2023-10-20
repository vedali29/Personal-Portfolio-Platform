const Certifications = require("../models/Certifications");
const Profile = require("../models/Profile");
const Projects = require("../models/Projects");

// Create Project
exports.createCertification = async (req, res) => {
  try {
    // data fetch
    const {
      certication_url,
      certification_title,
      certification_description,
      profileId,
    } = req.body;

    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return res.status(400).json({
        success: false,
        message: "Profile not found!",
      });
    }

    // create project with given name
    const newCertification = await Certifications.create({
      certification_url: certification_url,
      certification_title: certification_title,
      certification_description: certification_description,
    });

    // update projects in Profile schema with project ObjectID
    const updateProfileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        $push: {
          certifications: newCertification._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "certifications",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Certificate Added Successfully.",
      data: updateProfileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while Adding a Certificate, please try again.",
      error: error.message,
    });
  }
};

// Update Certification
exports.updateCertification = async (req, res) => {
  try {
    // data fetch
    const {
      certification_url,
      certification_title,
      certification_description,
      certicationId,
      profileId,
    } = req.body;

    // validate
    if (!profileId) {
      return res.status(401).json({
        success: false,
        message: "Profile Not Found",
      });
    }

    const updatedCertification = await Certifications.findByIdAndUpdate(
      certicationId,
      {
        certification_url: certification_url,
        certification_title: certification_title,
        certification_description: certification_description,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "certifications",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Certification Updated Successfully.",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while Updating a Certificate, please try again.",
      error: error.message,
    });
  }
};

// Delete Certification
exports.deleteCertification = async (req, res) => {
  try {
    // data fetch (id)
    const { certicationId, profileId } = req.body;

    // validate
    if (!certicationId) {
      return res.status(404).json({
        success: false,
        message: "Cerficate Not Found. Certication ID is not found.",
      });
    }

    await Certifications.findByIdAndDelete(certicationId, { new: true });

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "certifications",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Certicate Deleted Successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting a Certificate, please try again.",
      error: error.message,
    });
  }
};

// Get All Certifications
exports.getCertifications = async (req, res) => {
  try {
    const certifications = await Links.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "Certifications Fetched Successfully.",
      data: certifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching Certifications, please try again.",
      error: error.message,
    });
  }
};
