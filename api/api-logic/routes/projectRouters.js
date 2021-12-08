const express = require("express");
const router = express.Router();
const {
  getProjects,
  addProject,
  getSingleProject,
  updateProject,
  deleteProject,
  assignProject,
  getAssignedProject,
} = require("../controllers/projects");

router.route("/").get(getProjects);
router.route("/assigned/:user_id").get(getAssignedProject);
router.route("/:id").get(getSingleProject);
router.route("/").post(addProject);
router.route("/update/:id").put(updateProject);
router.route("/:id/delete").delete(deleteProject);
router.route("/assign").post(assignProject);

module.exports = router;
