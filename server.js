// app.js
import express from "express";
import mongoose from "mongoose";
import contractorRoute from "./routes/contractorRoute.js";
import searchRoutes from "./routes/searchContractRoute.js";
import ebixAPIRoutes from "./routes/ebixAPIRoutes.js";
import strataPlusEndPointRoute from "./routes/strataPlusEndPoint.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
const PORT = process.env.PORT || 5551;
const url =
  "mongodb+srv://santosh32:Nab74561@cluster0.ullo9hu.mongodb.net/ebixEngine?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Set a higher limit for request body size (e.g., 10MB)
app.use(bodyParser.json({ limit: "10mb" }));

// Routes
app.use("/api/contractors", contractorRoute);
app.use("/api/contractors", searchRoutes);
app.use("/api/contractors", ebixAPIRoutes);
app.use("/api/contractors", strataPlusEndPointRoute);

// Example route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
