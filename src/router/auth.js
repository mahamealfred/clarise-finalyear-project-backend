const express = require("express");
const { login, confirmAccount } = require("../controller/auth");
const router = express.Router();

router.route("/").post(login);
router.route("/confirmAccount/:token").get(confirmAccount);
module.exports = router;
