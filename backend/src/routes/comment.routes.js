import express from "express";
import * as commentController from "..//controllers/comment.controller.js";
import { upload } from "../middllewares/multer.middleware.js";
import decodeUserToken from "../middllewares/token.middlleware.js";
import { checkTypeUser } from "../middllewares/user.role.middlreware.js";
import * as validationViddlewares from "../middllewares/validateSchema.middlleware.js";
import { validateXhtmlMiddleware } from "../middllewares/validateXhtmlMiddleware.js";
import catchAsync from "../utils/catchAsync.js";
import * as validationSchema from "../validation/comment.schema.js";
import checkCaptcha from "../middllewares/captcha.middleware.js";

const commentRoutes = express.Router();

commentRoutes.post(
  "/",
  catchAsync(validationViddlewares(validationSchema.commentSchema)),
  catchAsync(checkCaptcha),
  catchAsync(validateXhtmlMiddleware),
  catchAsync(checkTypeUser),
  catchAsync(decodeUserToken),
  upload.single("file"),
  catchAsync(commentController.createComment)
);

commentRoutes.get("/", catchAsync(commentController.getComment));

export default commentRoutes;
