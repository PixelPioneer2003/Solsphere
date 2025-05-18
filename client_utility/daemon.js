// client/daemon.js
const cron = require("node-cron");
const os = require("os");
const checkDiskEncryption = require("./checks/disk_encryption");
const checkOSUpdateStatus = require("./checks/osUpdate");
const checkAntivirusStatus = require("./checks/antivirus");
const getSleepTimeoutMinutes = require("./checks/sleepSettings");
const sendData = require("./sendToServer");

let lastState = null;

async function getCurrentState() {
  const now = new Date();
  if (isNaN(now.getTime())) {
    throw new Error("🛑 Invalid timestamp detected");
  }

  return {
    machineId: os.hostname(),
    osUpdate: await checkOSUpdateStatus(),
    encryption: await checkDiskEncryption(),
    antivirus: await checkAntivirusStatus(),
    sleep: await getSleepTimeoutMinutes(),
  };
}

// ✅ Run once on startup
(async () => {
  try {
    const current = await getCurrentState();
    await sendData(current);
    lastState = current;
    console.log("✅ Initial data sent");
    console.log("  Current state:", current);
  } catch (err) {
    console.error("❌ Error during initial send:", err.message);
  }
})();

// 🔁 Run every 30 minutes
cron.schedule("*/30 * * * * *", async () => {
  try {
    const currentState = await getCurrentState();

    if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
      // 🔍 Show differences in console
      console.log("🔄 Detected changes:");
      if (lastState) {
        Object.keys(currentState).forEach((key) => {
          if (
            JSON.stringify(currentState[key]) !== JSON.stringify(lastState[key])
          ) {
            console.log(
              ` ${key} changed from`,
              lastState[key],
              "→",
              currentState[key]
            );
          }
        });
      } else {
        console.log("  🔰 First run, no previous state to compare.");
      }

      await sendData(currentState);
      lastState = currentState;
      console.log("✅ Data sent after change detected");
    } else {
      console.log("🟡 No change detected. Skipping send.");
    }
  } catch (err) {
    console.error("❌ Error during periodic check:", err.message);
  }
});
