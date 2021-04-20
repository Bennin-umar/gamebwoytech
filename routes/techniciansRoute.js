const express = require("express");

const {
  createTechnician,
  getAllTechnicians,
  getSingleTechnician,
  updateTechnician,
  deleteTechnician,
} = require("../controllers/techniciansController");

const router = express.Router();

router.route("/").post(createTechnician).get(getAllTechnicians);
router
  .route("/:_id")
  .get(getSingleTechnician)
  .put(updateTechnician)
  .delete(deleteTechnician);

module.exports = router;
