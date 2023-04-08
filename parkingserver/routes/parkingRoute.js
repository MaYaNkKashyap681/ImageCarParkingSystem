const express = require("express");
const {
  getAllVehicle,
  getVehicle,
  addVehicle,
  filterData,
} = require("../controllers/parkingController");
const router = express.Router();

router.get("/all", getAllVehicle);
router.get("/parking", getVehicle);
router.post("/add", addVehicle);

router.get("/filter/:filter", filterData);

module.exports = router;
