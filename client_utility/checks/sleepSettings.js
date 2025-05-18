const { execSync } = require("child_process");
const os = require("os");

function getSleepTimeoutMinutes() {
  const platform = os.platform();

  try {
    if (platform === "win32") {
      const output = execSync(
        'powershell "powercfg /query SCHEME_CURRENT SUB_SLEEP STANDBYIDLE"',
        { encoding: "utf-8" }
      );

      const matches = [
        ...output.matchAll(
          /Current (AC|DC) Power Setting Index:\s+0x([0-9a-fA-F]+)/g
        ),
      ];

      const result = {};
      matches.forEach(([_, type, hex]) => {
        const seconds = parseInt(hex, 16);
        result[type.toLowerCase() + "Minutes"] = seconds / 60;
      });

      console.log(`Sleep Timeout (AC): ${result.acMinutes} minutes`);
      console.log(`Sleep Timeout (DC): ${result.dcMinutes} minutes`);

      return result.dcMinutes <= 10;
    }

    if (platform === "darwin") {
      const output = execSync("pmset -g custom", { encoding: "utf-8" });
      const match = output.match(/sleep\s+(\d+)/);
      const minutes = match && match[1] ? parseInt(match[1], 10) : null;

      console.log(`Sleep Timeout (macOS): ${minutes} minutes`);
      return minutes !== null && minutes <= 10;
    }

    if (platform === "linux") {
      try {
        const output = execSync(
          "gsettings get org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout",
          { encoding: "utf-8" }
        ).trim();
        const seconds = parseInt(output);
        const minutes = seconds / 60;

        console.log(`Sleep Timeout (Linux AC): ${minutes} minutes`);
        return minutes <= 10;
      } catch {
        console.log("Sleep timeout check not supported or GNOME not detected.");
        return null;
      }
    }

    console.log("Unsupported platform for sleep timeout check.");
    return null;
  } catch (err) {
    console.error("Error retrieving sleep timeout:", err.message);
    return null;
  }
}

module.exports = getSleepTimeoutMinutes;
