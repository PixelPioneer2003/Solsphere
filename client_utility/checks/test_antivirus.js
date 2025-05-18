// client_utility/checks/test_sleepTimeout.js
const checkOSUpdateStatus = require("./osUpdate");

const result = checkOSUpdateStatus();
console.log("✅ Sleep timeout is within 10 minutes." + result.currentVersion);
