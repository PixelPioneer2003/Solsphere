const Machine = require("../models/Machine");

exports.submitMachineStatus = async (req, res) => {
  try {
    const {
      machineId,
      osUpdate, // version string from OS check
      encryption, // "yes" or "no"
      antivirus, // "yes" or "no"
      sleep, // "yes" or "no" or number (depends on your setup)
    } = req.body;

    const updatedMachine = await Machine.findOneAndUpdate(
      { machineId },
      {
        osVersion: osUpdate,
        encryption,
        antivirus,
        sleep,
        lastChecked: new Date(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: updatedMachine });
  } catch (err) {
    console.error("❌ Error updating machine status:", err.message);
    res.status(500).json({ error: "Failed to store machine status" });
  }
};

exports.getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.find().sort({ lastChecked: -1 });
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch machines" });
  }
};

exports.filterMachines = async (req, res) => {
  try {
    const { osVersion, isUpdated } = req.query;
    const filter = {};

    if (osVersion) filter.osVersion = osVersion;
    if (isUpdated !== undefined) filter.isUpdated = isUpdated === "true";

    const results = await Machine.find(filter);
    res.json(results);
  } catch (err) {
    console.error("error in filterin error", err);
    res.status(500).json({ error: "Filter error" });
  }
};

exports.exportCSV = async (req, res) => {
  const { Parser } = require("json2csv");
  try {
    const machines = await Machine.find();
    const fields = ["machineId", "osVersion", "lastChecked"];
    const parser = new Parser({ fields });
    const csv = parser.parse(machines);

    res.header("Content-Type", "text/csv");
    res.attachment("machines.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: "CSV export failed" });
  }
};
