// app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import bannerRoutes from "./routes/bannerRoutes";
import userRoutes from "./routes/userRoutes";
import packagesRoutes from "./routes/packageRoutes";
import path from "path";
// import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();


app.use(cors());
app.use(helmet());
app.use(compression())
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(
  "/uploads",
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.100.4:3000",
      "https://yourdomain.com"
    ],
    methods: ["GET"],
  }),
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "../uploads"))
);



app.use("/api/blogs", blogRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/packages", packagesRoutes);



// app.use(errorMiddleware);

export default app;
