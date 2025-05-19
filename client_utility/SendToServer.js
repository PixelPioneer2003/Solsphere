// sendToServer.js
const axios = require("axios");

async function sendData(data) {
  try {
    const res = await axios.post(
      "https://solsphere.onrender.com/api/machines/submit",
      data
    );
    console.log("✅ Data sent successfully:", res.status);
  } catch (error) {
    console.error("❌ Failed to send data:", error.message);
  }
}

module.exports = sendData;
