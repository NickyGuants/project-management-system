const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware')

const { getUsers, getSingleUser, deleteUser, updateUser } = require('../controllers/users')

router.route('/').get(protect,admin,getUsers);
router.route('/:id').get(getSingleUser);
router.route('/update/:id').put(updateUser);
router.route('/delete/:id').delete(protect,deleteUser);

module.exports = router
