import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cors from 'cors';
import connectDB from "./config/db.js";

import userRoutes from "./routes/user.js";
import contactRoutes from "./routes/contact.js";

const app = express();
connectDB();

// Error Handling middlewares
app.use(express.json());
app.use(cors());

// configure all routes
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : http://localhost:${PORT}`);
});
