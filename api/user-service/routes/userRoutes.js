const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");

const {
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

router.route("/").get(getUsers);
router.route("/:id").get(getSingleUser);
router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);

module.exports = router;
