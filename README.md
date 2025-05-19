# 💻 Cross-Platform System Health Monitoring

A full-stack system health monitoring platform that collects and visualizes system metrics across Windows, macOS, and Linux environments.

---

## 📁 Project Structure

cross-platform-system-monitoring/
├── client_utility/ # Node.js utility for collecting system data
├── backend/ # Express.js server with MongoDB integration
├── admin_frontend/ # React dashboard for data visualization


---

## ⚙️ Features

### ✅ Client Utility
- Built using **Node.js**
- Executes system-level checks via PowerShell, Bash, or Zsh to collect:
  - OS Version
  - Disk Encryption Status
  - Antivirus Status
  - Sleep Settings
- Sends data as JSON to the backend API
- Can be compiled into a `.exe` using [`pkg`](https://github.com/vercel/pkg) for background execution

### ✅ Backend
- Node.js server using **Express.js** and **MongoDB Atlas**
- REST API to:
  - Accept and store reports from clients
  - List all monitored machines
  - Filter machines by OS version or other flags
  - Export data to CSV
- Hosted on [Render](https://render.com)

### ✅ Admin Frontend
- Built using **React**
- Fetches and displays machine data in a table
- Supports filtering by OS version and flags
- Allows CSV data export

---

## 🧾 Mongoose Model

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
POST /api/machines
Accepts JSON payload from clients:

{
  "machineId": "DESKTOP-001",
  "osVersion": "10.0.26100",
  "encryption": "yes",
  "antivirus": "no",
  "sleep": "yes"
}
GET /api/machines
Returns all stored machine reports

GET /api/machines/export
Downloads a CSV file of all machine records
🔧 Technologies Used
Frontend: React, Axios,CSS 

Backend: Node.js, Express.js, MongoDB Atlas, Mongoose

Client Utility: Node.js, PowerShell, pkg

Hosting: Render (backend), GitHub
