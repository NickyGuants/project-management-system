const express = require('express');
const { getAllTasks, getSingleTask, updateTask } = require('../controllers/tasks');

const router = express.Router();

router.route('/').get(getAllTasks);
router.route('/:id').get(getSingleTask);
router.route('/:id').patch(updateTask);

module.exports = router;