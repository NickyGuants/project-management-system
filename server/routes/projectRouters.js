const express = require('express');
const router = express.Router();
const {getProjects, addProject, getSingleProject, updateProject, deleteProject} =require('../controllers/projects')

router.route('/').get(getProjects);
router.route('/:id').get(getSingleProject)
router.route('/').post(addProject)
router.route('/update/:id').patch(updateProject)
router.route('/:id/delete').delete(deleteProject)

module.exports = router;