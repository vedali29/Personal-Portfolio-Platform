const Profile = require("../models/Profile");
const Projects = require("../models/Projects");
const User = require("../models/User");

// Create Project
exports.createProject = async (req, res) => {
  try {
    // data fetch
    const {
      project_title,
      project_description,
      techstack,
      project_link,
      profileId,
    } = req.body;

    // validate
    if (!project_title || !project_description || !profileId) {
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
    const newProject = await Projects.create({
      project_title: project_title,
      project_description: project_description,
      project_link: project_link,
      techstack: techstack,
    });

    // update projects in Profile schema with project ObjectID
    const updateProfileDetails = await Profile.findByIdAndUpdate(
      profileId,
      {
        $push: {
          projects: newProject._id,
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
      message: "Project Created Successfully.",
      data: updateProfileDetails,
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

// Update Project
exports.updateProject = async (req, res) => {
  try {
    // data fetch
    const {
      project_title,
      project_description,
      techstack,
      project_link,
      projectId,
      profileId,
    } = req.body;

    // validate
    if (!project_title || !project_description || !projectId) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the required details carefully",
      });
    }

    const updatedProject = await Projects.findByIdAndUpdate(
      projectId,
      {
        project_title: project_title,
        project_description: project_description,
        project_link: project_link,
        techstack: techstack,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "projects",
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

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    // data fetch (id)
    const { projectId, profileId } = req.body;

    // validate
    if (!projectId) {
      return res.status(404).json({
        success: false,
        message: "Project ID is not found.",
      });
    }

    await Projects.findByIdAndDelete(projectId, { new: true });

    const updatedProfile = await Profile.findById(profileId)
      .populate({
        path: "projects",
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Project Deleted Successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting the Project, please try again.",
      error: error.message,
    });
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find({});

    // return response
    return res.status(200).json({
      success: true,
      message: "All Projects Fetched Successfully.",
      data: allProjects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching all Projects, please try again.",
      error: error.message,
    });
  }
};
