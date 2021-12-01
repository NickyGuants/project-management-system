const express = require('express');
const { getAllTasks, getSingleTask } = require('../controllers/tasks');

const router = express.Router();

router.route('/').get(getAllTasks);
router.route('/:id').get(getSingleTask)

module.exports = router;