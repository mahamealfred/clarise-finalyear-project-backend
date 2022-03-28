const express = require("express");
const { createUser, getAllUsers } = require("../controller/user");
const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
module.exports = router;
