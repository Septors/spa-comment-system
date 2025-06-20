import prisma from "../config/prisma.js";
import { resizeQueue } from "../redis/queues.js";
import * as imageUtils from "../utils/image.utils.js";

const maxWidth = parseInt(process.env.MAX_WIDTH_IMAGE);
const maxHeight = parseInt(process.env.MAX_HEIGHT_IMAGE);

/*Перевіряє розміри файлу за рахунок функці cheImageSize,
вона приймає обьект файлу з multer.middleware,отримує його мета данні,та звіряє з потрібнимию.*/
export const checkSizeFile = async (filePath) => {
  const { width, height } = await imageUtils.checkImageSize(filePath);
  return width <= maxWidth && height <= maxHeight;
};

//створює комментар за рахунок айді користувача який ми отрумуємо через токен доступу та данних с тіла запиту.
export const createCommentWithoutFile = async (
  userId,
  data,
  isResizing = false
) => {
  return await prisma.comment.create({
    data: {
      ...data,
      userId,
      isResizing,
    },
  });
};

//створює коментар без файлу,створюємо файл,підвязуємо файл до коментарю
export const createComment = async (userId, data, fileData, fileType) => {
  const comment = await createCommentWithoutFile(userId, data);
  await prisma.file.create({
    data: {
      userId,
      commentId: comment.id,
      fileName: fileData.filename,
      type: fileType,
      url: fileData.path,
    },
  });
  await addFileToComment(userId, comment.id, fileData.filename, fileData.path);
};

//за рахунок того що створення коментаря універсальне,при наявності файлу ми його  підвязуємо до коментаря.
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

//створення коментарю в залежності від типу файла,а також його розміру.
export const createCommentWithFile = async (userId, data, fileData) => {
  const typeFile = fileData.mimetype === "text/plain" ? "TEXT" : "IMAGE"; //Перевіряємо типу файлу.

  //Якщо це файловий текст,то створюємо коментар,файл,підвязуємо файл.
  if (typeFile === "TEXT") {
    await createComment(userId, data, fileData, typeFile);
    return;
  }

  const isSizeValid = await checkSizeFile(fileData.path); //Викликаємо перевірку розміру файлу.

  //Якщо в нормі то створюємо коментар,файл,підвязуємо файл під коментар,а якщо ні то створяємо коментар,передаємо в чергу для зміну черги.
  if (isSizeValid) {
    await createComment(userId, data, fileData, typeFile);
  } else {
    const comment = await createCommentWithoutFile(userId, data, true);
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
