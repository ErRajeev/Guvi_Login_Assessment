const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());

// Port and Database Connection String
const PORT = process.env.PORT || 8000;
const DbUrl = process.env.DBURL;

mongoose
  .connect(DbUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("hello there !!");
});
