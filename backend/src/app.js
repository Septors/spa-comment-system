import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { handleErrorMidlleware } from "./middllewares/errorHandler.js";

const app = express();

app.use(handleErrorMidlleware);
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/user", userRoutes);

export default app;
