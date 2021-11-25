const express = require('express');
const router = express.Router();
const {getProjects, addProject, getSingleProject, updateProject} =require('../controllers/projects')

router.route('/').get(getProjects);
router.route('/:id').get(getSingleProject)
router.route('/').post(addProject)
router.route('/update/:id').patch(updateProject)

module.exports = router;