// app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
// import blogRoutes from "./routes/blogRoutes";
// import bannerRoutes from "./routes/bannerRoutes";
// import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();


app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/banners", bannerRoutes);

// app.use(errorMiddleware);

export default app;
