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

app.use((err, req, res, next) => {
  // hata yakalayıcı: beklenmeyen hata sunucuyu durdurmaz
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
