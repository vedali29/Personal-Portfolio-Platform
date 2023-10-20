const Links = require("../models/Links");
const Profile = require("../models/Profile");
const Projects = require("../models/Projects");
const User = require("../models/User");

// Create Links
exports.createLinks = async (req, res) => {
  try {
    // data fetch
    const { link_title, link_url, link_description, profileId } = req.body;

    const profileDetails = await Profile.findById(profileId);
    if (!profileDetails) {
      return res.status(400).json({
        success: false,
        message: "Profile not found!",
      });
    }

    // create project with given name
    const newOtherLinks = await Links.create({
      link_title: link_title,
      link_url: link_url,
      link_description: link_description,
    });

    // update Other Links in Profile schema with project ObjectID
    const updateProfileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        $push: {
          other_links: newOtherLinks._id,
        },
      },
      {
        new: true,
      }
    )
      .populate({
        path: "other_links",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Other Links Created Successfully.",
      data: updateProfileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating a Link, please try again.",
      error: error.message,
    });
  }
};

// Update Links
exports.updateLinks = async (req, res) => {
  try {
    // data fetch
    const { link_title, link_url, link_description, otherLinksId, profileId } =
      req.body;

    const updatedProject = await Projects.findByIdAndUpdate(
      otherLinksId,
      {
        link_title: link_title,
        link_url: link_url,
        link_description: link_description,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "other_links",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Other Link Updated Successfully.",
      updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while Updating Other Link, please try again.",
      error: error.message,
    });
  }
};

// Delete Links
exports.deleteLinks = async (req, res) => {
  try {
    // data fetch (id)
    const { otherLinksId, profileId } = req.body;

    // validate
    if (!otherLinksId) {
      return res.status(404).json({
        success: false,
        message: "otherLinksId ID is not found.",
      });
    }

    await Links.findByIdAndDelete(otherLinksId, { new: true });

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "other_links",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Other Link Deleted Successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting Other Link, please try again.",
      error: error.message,
    });
  }
};

// Get All Other Links
exports.getOtherLinks = async (req, res) => {
  try {
    const otherLinks = await Links.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "Other Links Fetched Successfully.",
      data: otherLinks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching Other Links, please try again.",
      error: error.message,
    });
  }
};
