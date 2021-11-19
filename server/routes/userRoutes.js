const express = require('express');
const router = express.Router();

const { addUser, getUsers, getSingleUser, deleteUser, updateUser, login } = require('../controllers/users')

router.route('/').get(getUsers);
router.route('/:id').get(getSingleUser);

router.route('/signup').post(addUser);
router.route('/login').post(login);

router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

module.exports = router
