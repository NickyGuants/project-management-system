const express = require('express');
const { getAllTasks, getSingleTask, updateTask, addTask, deleteTask } = require('../controllers/tasks');

const router = express.Router();

router.route('/').get(getAllTasks);
router.route('/').post(addTask);
router.route('/:id').get(getSingleTask);
router.route('/:id').patch(updateTask);
router.route('/delete/:id').delete(deleteTask)

module.exports = router;