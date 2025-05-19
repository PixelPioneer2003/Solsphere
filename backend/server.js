require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const machineRoutes = require("./routes/machineRoutes");
const cors = require("cors");

const db = require("./config/database");
const app = express();
app.use(cors());
app.use(express.json());
db.connect();
app.use("/api/machines", machineRoutes);
