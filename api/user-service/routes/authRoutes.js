const express = require('express');
const router = express.Router();

const { addUser, login, resetPassword} = require('../controllers/auth');

router.route('/signup').post(addUser);
router.route('/login').post(login);
router.route('/reset-password').post(resetPassword)

module.exports = router;