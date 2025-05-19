const express = require("express");
const router = express.Router();
const controller = require("../controllers/machineController");

router.post("/submit", controller.submitMachineStatus);
router.get("/", controller.getAllMachines);
router.get("/filter", controller.filterMachines);
router.get("/export", controller.exportCSV);
router.get("/:id", controller.getMachineById);
router.get("/machineId/:machineId", controller.getMachineByMachineId);
module.exports = router;
