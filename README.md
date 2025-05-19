# 💻 Cross-Platform System Health Monitoring

It is a full-stack platform to monitor, collect, and visualize system health metrics across Windows, macOS, and Linux environments. It includes:

- 🔧 `client_utility`: System-level checker that sends data from multiple OS environments
- 🌐 `backend`: REST API server connected to MongoDB Atlas
- 📊 `admin_frontend`: React-based dashboard to visualize and filter machine status

---

## 📁 Project Structure


---

## ⚙️ Features

### ✅ Client Utility
- Built in Node.js
- Executes system-level checks using PowerShell/bash/zsh:
  - OS Version
  - Disk Encryption
  - Antivirus status
  - Inactivity Sleep Settings
- Runs periodically or as a `.exe` (compiled with `pkg`)
- Sends data as JSON to the backend API

### ✅ Backend
- Node.js with Express and MongoDB Atlas
- Exposes APIs to:
  - Accept and store machine reports
  - List machines
  - Filter by OS version, update status, and flags
  - Export data as CSV
- Hosted on [Render](https://render.com)

### ✅ Admin Frontend
- Built with React
- Fetches machine data from backend
- Displays table of machines with filters
- CSV export support

---

## 🧾 Mongoose Model (machineSchema)

```js
const machineSchema = new mongoose.Schema({
  machineId: { type: String, required: true },
  osVersion: { type: String, required: true }, // e.g., "10.0.26100"
  encryption: { type: String, enum: ["yes", "no"] },
  antivirus: { type: String, enum: ["yes", "no"] },
  sleep: { type: String, enum: ["yes", "no"] },
  lastChecked: { type: Date, default: Date.now },
});
🔌 API Endpoints

{
  "machineId": "DESKTOP-001",
  "osVersion": "10.0.26100",
  "encryption": "yes",
  "antivirus": "no",
  "sleep": "yes"
}
GET /api/machines
Returns all machines and their system status.
GET /api/machines/export
Downloads a CSV file with all machine records.

🚀 Local Setup Instructions
1. Backend
bash
Copy
Edit
cd backend
npm install
# .env file must include:
# MONGO_URI=<your-mongo-uri>
npm start
2. Client Utility
bash
Copy
Edit
cd client_utility
npm install
node daemon.js          # Run normally
pkg . --out-path build  # Compile into Windows executable
The .exe runs in the background and reports machine data periodically.

3. Admin Frontend
bash
Copy
Edit
cd admin_frontend
npm install
npm start
🔧 Technologies Used
Frontend: React, Axios, Tailwind (optional)

Backend: Express.js, MongoDB Atlas, Mongoose

Utility: Node.js, PowerShell/bash/zsh, pkg

Hosting: Render (backend), GitHub

