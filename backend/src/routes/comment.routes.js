import express from "express";
import * as commentController from "..//controllers/comment.controller.js";
import decodeUserToken from "../middllewares/auth.middlleware.js";
import { upload } from "../middllewares/multer.middleware.js";
import { checkTypeUser } from "../middllewares/user.type.middlreware.js";
import * as validationViddlewares from "../middllewares/validation.middlleware.js";
import catchAsync from "../utils/catchAsync.js";
import * as validationSchema from "../validation/comment.schema.js";

const commentRoutes = express.Router();

commentRoutes.post(
  "/",
  catchAsync(validationViddlewares(validationSchema.commentSchema)),
  catchAsync(checkTypeUser),
  catchAsync(decodeUserToken),
  upload.single("file"),
  catchAsync(commentController.createComment)
);

commentRoutes.get("/", catchAsync(commentController.getComment));

export default commentRoutes;
