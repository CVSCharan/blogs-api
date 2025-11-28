import express from "express";
import cors from "cors";
import helmet from "helmet";
import postRoutes from "./presentation/routes/post.routes";
import categoryRoutes from "./presentation/routes/category.routes";
import tagRoutes from "./presentation/routes/tag.routes";
import commentRoutes from "./presentation/routes/comment.routes";
import reactionRoutes from "./presentation/routes/reaction.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);
app.use("/tags", tagRoutes);
app.use("/comments", commentRoutes);
app.use("/reactions", reactionRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export { app };
