const express = require("express");
const { createUser, getAllUsers,updateUser,findOneUser } = require("../controller/user");
const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
router.route("/update/:id").put(updateUser);
router.route("/finduser/:id").get(findOneUser)
module.exports = router;
