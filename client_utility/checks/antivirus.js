const { execSync } = require("child_process");
const os = require("os");

function checkAntivirusStatus() {
  const platform = os.platform();

  try {
    if (platform === "win32") {
      //  Windows - Using PowerShell
      const output = execSync(
        'powershell "Get-MpComputerStatus | Select-Object -ExpandProperty AntivirusEnabled"',
        { encoding: "utf-8" }
      ).trim();

      console.log("🛡️ Windows Antivirus Status:", output);
      return output.toLowerCase().includes("true");
    } else if (platform === "darwin") {
      //  macOS
      const output = execSync("ps aux", { encoding: "utf-8" });
      const knownAV = ["norton", "mcafee", "avast", "sophos", "bitdefender"];
      const found = knownAV.find((av) => output.toLowerCase().includes(av));

      if (found) {
        console.log(`🛡️ macOS Antivirus process detected: ${found}`);
        return true;
      } else {
        console.log("⚠️ No known macOS antivirus process detected.");
        return false;
      }
    } else if (platform === "linux") {
      //  Linux
      const output = execSync("ps aux", { encoding: "utf-8" });
      const knownAV = ["clamd", "clamav", "avgd", "f-prot", "sophos"];
      const found = knownAV.find((av) => output.toLowerCase().includes(av));

      if (found) {
        console.log(`🛡️ Linux Antivirus process detected: ${found}`);
        return true;
      } else {
        console.log(" No known Linux antivirus process detected.");
        return false;
      }
    } else {
      console.warn(" Unsupported OS:", platform);
      return false;
    }
  } catch (err) {
    console.error(" Error checking antivirus status:", err.message);
    return false;
  }
}

module.exports = checkAntivirusStatus;
