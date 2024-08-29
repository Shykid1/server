const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const dbConnect = require("./utils/db");

// config env
env.config();

// connect to db
dbConnect();

// init express
const app = express();

// middleware
app.use(express.json());
app.use(cors());

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

// Your Google Places API key
const API_KEY = process.env.PLACES_KEY;

app.get("/places/*", async (req, res) => {
  try {
    const endpoint = req.params[0];
    const queryParams = new url.URLSearchParams(req.query);
    queryParams.append("key", API_KEY);

    const apiUrl = `https://maps.googleapis.com/maps/api/place/${endpoint}?${queryParams}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
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
