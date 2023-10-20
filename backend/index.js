const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

// Connect Database
require("../backend/config/database").connect();

// Import Routes and Mount
const userRoutes = require("../backend/routes/user");
app.use("/api/v1", userRoutes);

// Activate a Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
