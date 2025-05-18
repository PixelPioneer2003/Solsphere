require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const machineRoutes = require("./routes/machineRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/machines", machineRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port", process.env.PORT || 5000);
    });
  })
  .catch((err) => console.error("Mongo connection error:", err));
