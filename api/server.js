// api/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // <--- CORS is required for frontend access
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connection Successful!");
    } catch (err) {
        console.error("DB Connection Error:", err);
        console.error("Please check your MONGO_URL in the .env file.");
        process.exit(1);
    }
};

connectDB();


// --- Middlewares ---
// ADD CORS MIDDLEWARE HERE
app.use(cors());

app.use(express.json()); // To parse JSON bodies

// --- Routes ---
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

// --- Server Start ---
const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}!`);
});