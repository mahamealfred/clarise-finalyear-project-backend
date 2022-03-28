const express = require("express");

const {
  createBisinessIdea,
  getBusinessIdea,
  getSingleBusinessIdea,
} = require("../controller/bisinessIdea");
const { createEmployeeFromFileUpload } = require("../controller/fileUpload");

const router = express.Router();

router.route("/").post(createBisinessIdea).get(getBusinessIdea);
router.route("/upload").post(createEmployeeFromFileUpload);
router.route("/singleIdea/:id").get(getSingleBusinessIdea);
module.exports = router;
