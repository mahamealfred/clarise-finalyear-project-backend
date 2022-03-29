const express = require("express");
const { createUser, getAllUsers,updateUser } = require("../controller/user");
const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
router.route("/update/:id").put(updateUser);
module.exports = router;
