const express = require('express');
const router = express.Router();
const {getProjects, addProject, getSingleProject} =require('../controllers/projects')

router.route('/').get(getProjects);
router.route('/:id').get(getSingleProject)
router.route('/').post(addProject)

module.exports = router;