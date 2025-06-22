import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { handleErrorMidlleware } from "./middllewares/errorHandler.js";
import captchaRoutes from "./routes/captcha.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/captcha", captchaRoutes);
app.use(handleErrorMidlleware);

export default app;
