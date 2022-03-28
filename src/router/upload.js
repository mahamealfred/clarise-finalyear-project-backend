const express = require("express");
const router = express.Router();
const { createEmployeeFromFileUpload } = require("../controller/fileUpload");

router.route("/").post(createEmployeeFromFileUpload);

module.exports = router;
