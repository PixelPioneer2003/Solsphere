const { execSync } = require("child_process");

function checkDiskEncryption() {
  try {
    const output = execSync("manage-bde -status C:", { encoding: "utf-8" });

    if (output.includes("Fully Encrypted")) {
      return true;
    } else if (output.includes("Fully Decrypted")) {
      return false;
    } else {
      console.warn("⚠️ Encryption status unclear:\n", output);
      return false;
    }
  } catch (err) {
    console.error("❌ Error checking disk encryption:", err.message);
    return false;
  }
}

module.exports = checkDiskEncryption;
