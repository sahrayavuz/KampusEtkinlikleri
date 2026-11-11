import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();
app.use(cors());
app.use(express.json()); // body -> req.body

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2321032034",
  });
});

app.use("/events", eventRoutes);

app.use((req, res) => {
  // eşleşme yoksa
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;