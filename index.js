const express = require("express");
const env = require("dotenv");
const dbConnect = require("./utils/db");

// config env
env.config();

// connect to db
dbConnect();

// init express
const app = express();

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Wolcome to doorbel api",
    data: {
      company: "Doorbel",
      name: "Doorbel API",
      version: "1.0.0",
      description: "Doorbel API for errands and riders",
      developer: "Synthotech Solutions",
      contact: "PH: +233 54 092 1960, Email: synthotechsolutions@gmail.com",
    },
  });
});

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/riders", require("./routes/rider.routes"));
app.use("/api/errands", require("./routes/errand.routes"));

// listen
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
