const express = require("express");
const {
  createBisinessDefinition,
  fetchBisinessDefinition,
  fetchSingleBisinessDefinition,
  deleteBisinessDefinition,
  updateBisinessDefinition,
} = require("../controller/bisinessDefinition");

const router = express.Router();

router.route("/").get(fetchBisinessDefinition).post(createBisinessDefinition);
router
  .route("/category/:id")
  .get(fetchSingleBisinessDefinition)
  .delete(deleteBisinessDefinition)
  .put(updateBisinessDefinition);
module.exports = router;
