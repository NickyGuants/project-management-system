const express = require('express');
const router = express.Router();

const { addUser, login} = require('../controllers/auth');

router.route('/signup').post(addUser);
router.route('/login').post(login);

module.exports = router;