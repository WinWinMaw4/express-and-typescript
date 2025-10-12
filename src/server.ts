import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";

dotenv.config();

// const app = express();
import app from "./app";

const PORT = process.env.PORT || 5000;

// app.use(express.json());

app.get("/", async (req, res) => {
  try {
const [result]: any = await sequelize.query("SELECT NOW()");
res.json({ message: "Hello from server!", time: result[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
  }
})();
