const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Moddlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const { router } = require("./routes/telegram");
app.use("/", router);

//Connect to DB
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose
  .connect(process.env.DB_CONNECTION, mongooseOptions)
  .then(() => console.log("DB connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

//listener
app.listen(process.env.PORT || 3000);
