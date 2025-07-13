import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import { connectDB } from "./lib/db.js";
import path from "path";
import cors from "cors";
import cron from "node-cron";
import fs from "fs";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import albumRoutes from "./routes/albums.route.js";
import songRoutes from "./routes/songs.route.js";
import statsRoutes from "./routes/stats.route.js";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";
// import { error } from "console";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10 MB
    },
  })
);
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("*/30 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {});
      }
    });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

//error handler
app.use((err, req, res, next) => {
  return res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log("Port is " + PORT);
  connectDB();
});
