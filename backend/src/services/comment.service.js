import prisma from "../config/prisma.js";
import { resizeQueue } from "../redis/queues.js";
import * as imageUtils from "../utils/image.utils.js";

const maxWidth = parseInt(process.env.MAX_WIDTH_IMAGE);
const maxHeight = parseInt(process.env.MAX_HEIGHT_IMAGE);

export const checkSizeFile = async (filePath) => {
  const { width, height } = await imageUtils.checkImageSize(filePath);
  return width <= maxWidth && height <= maxHeight;
};

export const createComment = async (userId, data, isResizing = false) => {
  return await prisma.comment.create({
    data: {
      ...data,
      userId,
      isResizing,
    },
  });
};

export const createFile = async (
  userId,
  commentId,
  fileName,
  fileUrl,
  fileType
) => {
  return await prisma.file.create({
    data: {
      userId,
      commentId: commentId,
      fileName: fileName,
      type: fileType,
      url: fileUrl,
    },
  });
};

export const addFileToComment = async (
  userId,
  commentId,
  fileName,
  filePath
) => {
  await prisma.comment.update({
    where: {
      id: commentId,
      userId,
    },
    data: {
      fileName,
      filePath,
    },
  });
};

export const createCommentWithFile = async (userId, data, fileData) => {
  const typeFile = fileData.mimetype === "text/plain" ? "TEXT" : "IMAGE";

  if (typeFile === "TEXT") {
    const comment = await createComment(userId, data);
    await createFile(
      userId,
      comment.id,
      fileData.filename,
      fileData.path,
      typeFile
    );
    await addFileToComment(
      userId,
      comment.id,
      fileData.filename,
      fileData.path
    );
  }

  const normalSizeFile = await checkSizeFile(fileData.path);

  if (normalSizeFile) {
    const comment = await createComment(userId, data);
    await createFile(
      userId,
      comment.id,
      fileData.filename,
      fileData.path,
      typeFile
    );
    await addFileToComment(
      userId,
      comment.id,
      fileData.filename,
      fileData.path
    );
  } else {
    const comment = await createComment(userId, data, true);
    await resizeQueue.add("resize-image", {
      filePath: fileData.path,
      outPutPath: fileData.filename,
      width: maxWidth,
      height: maxHeight,
      commentId: comment.id,
      userId,
    });
  }
};
