const { execSync } = require("child_process");
const os = require("os");

function checkOSUpdateStatus() {
  const platform = os.platform();

  try {
    if (platform === "win32") {
      const output = execSync("systeminfo", { encoding: "utf-8" });
      const match = output.match(/OS Version:\s*([\d.]+)/);
      const version = match && match[1] ? match[1].trim() : null;

      console.log(" Windows OS Version:", version);
      return version;
    } else if (platform === "darwin") {
      const output = execSync("sw_vers -productVersion", {
        encoding: "utf-8",
      }).trim();
      console.log(" macOS Version:", output);
      return output;
    } else if (platform === "linux") {
      // Linux: Use lsb_release if available, else fallback to /etc/os-release
      try {
        const output = execSync("lsb_release -d", { encoding: "utf-8" });
        const match = output.match(/Description:\s*(.+)/);
        const version = match && match[1] ? match[1].trim() : null;
        console.log(" Linux OS Version (lsb_release):", version);
        return version;
      } catch {
        const osRelease = execSync("cat /etc/os-release", {
          encoding: "utf-8",
        });
        const match = osRelease.match(/PRETTY_NAME="(.+)"/);
        const version = match && match[1] ? match[1].trim() : null;
        console.log(" Linux OS Version (os-release):", version);
        return version;
      }
    } else {
      console.warn(" Unsupported platform for OS update check:", platform);
      return null;
    }
  } catch (err) {
    console.error(" Error checking OS update:", err.message);
    return null;
  }
}

module.exports = checkOSUpdateStatus;
