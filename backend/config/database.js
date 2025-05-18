const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      UseUnifiedTopology: true,
    })
    .then(() => console.log("suucessfully connected db"))
    .catch((error) => {
      console.log("unable to connect db ");
      console.log(error);
      process.exit(1);
    });
};
