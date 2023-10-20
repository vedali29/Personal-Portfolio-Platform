const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const { getProfile, updateProfile } = require("../controllers/profile");
const {
  updateEducation,
  createEducation,
  deleteEducation,
  getEducation,
} = require("../controllers/education");
const {
  createCertification,
  updateCertification,
  deleteCertification,
  getCertifications,
} = require("../controllers/certifications");
const {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/professionalExperience");
const {
  createOtherExperience,
  getOtherExperience,
  updateOtherExperience,
  deleteOtherExperience,
} = require("../controllers/otherExperience");
const {
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievements");
const {
  createLinks,
  updateLinks,
  deleteLinks,
  getOtherLinks,
} = require("../controllers/links");
const {
  getProjects,
  updateProject,
  deleteProject,
  createProject,
} = require("../controllers/projects");
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skills");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/login", login);
router.post("/signup", signup);

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.get("/profile", getProfile);
router.put("/updateProfile", updateProfile);

// ********************************************************************************************************
//                                      Education routes
// ********************************************************************************************************

router.get("/education", getEducation);
router.post("/createEducation", createEducation);
router.put("/updateEducation", updateEducation);
router.delete("/deleteEducation", deleteEducation);

// ********************************************************************************************************
//                                      Certification routes
// ********************************************************************************************************

router.get("/certifications", getCertifications);
router.post("/createCertifications", createCertification);
router.put("/updateCertifications", updateCertification);
router.delete("/deleteCertifications", deleteCertification);

// ********************************************************************************************************
//                                      Projects routes
// ********************************************************************************************************

router.get("/projects", getProjects);
router.post("/createProject", createProject);
router.put("/updateProject", updateProject);
router.delete("/deleteProject", deleteProject);

// ********************************************************************************************************
//                                      Experience routes
// ********************************************************************************************************

router.get("/experience", getExperience);
router.post("/createExperience", createExperience);
router.put("/updateExperience", updateExperience);
router.delete("/deleteExperience", deleteExperience);

// ********************************************************************************************************
//                                      Other Experience routes
// ********************************************************************************************************

router.get("/otherExperience", getOtherExperience);
router.post("/createOtherExperience", createOtherExperience);
router.put("/updateOtherExperience", updateOtherExperience);
router.delete("/deleteOtherExperience", deleteOtherExperience);

// ********************************************************************************************************
//                                      Skills routes
// ********************************************************************************************************

router.get("/skills", getSkills);
router.post("/createSkills", createSkill);
router.put("/updateSkills", updateSkill);
router.delete("/deleteSkills", deleteSkill);

// ********************************************************************************************************
//                                      Achievements routes
// ********************************************************************************************************

router.get("/achievements", getAchievement);
router.post("/createAchievements", createAchievement);
router.put("/updateAchievements", updateAchievement);
router.delete("/deleteAchievements", deleteAchievement);

// ********************************************************************************************************
//                                      Other Links routes
// ********************************************************************************************************

router.get("/otherLinks", getOtherLinks);
router.post("/createLinks", createLinks);
router.put("/updateLinks", updateLinks);
router.delete("/deleteLinks", deleteLinks);

module.exports = router;
