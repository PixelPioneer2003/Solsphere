// const mongoose = require("mongoose");

// const machineSchema = new mongoose.Schema({
//   machineId: String,
//   osVersion: String,
//   isUpdated: Boolean,
//   lastChecked: { type: Date, default: Date.now },
//   extraInfo: mongoose.Schema.Types.Mixed,
// });

// module.exports = mongoose.model("Machine", machineSchema);
const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  machineId: { type: String, required: true },
  osVersion: { type: String, required: true }, // e.g., "10.0.26100"
  encryption: { type: String, enum: ["yes", "no"] }, // from disk encryption check
  antivirus: { type: String, enum: ["yes", "no"] }, // from antivirus check
  sleep: { type: String, enum: ["yes", "no"] }, // if you're returning "yes"/"no"
  lastChecked: { type: Date, default: Date.now }, // auto-set timestamp
});

module.exports = mongoose.model("Machine", machineSchema);
