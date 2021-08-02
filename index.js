require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const crudRoutes = require("./routes/crudRoutes")

// set up express app
const app = express();
// app.use(express.static("public"));
app.use(express.json());

// connect to mongoDB
const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.API_PORT);
    console.log("Listening to port 4000");
  })
  .catch((err) => console.log(err));

// initialize routes
app.use("/user", userRoutes);
app.use("/crud", crudRoutes);
