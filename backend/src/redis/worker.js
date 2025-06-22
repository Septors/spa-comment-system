import { Worker } from "bullmq";
import prisma from "../config/prisma.js";
import redisClient from "../config/redis.js";
import { resizeImage } from "../utils/image.utils.js";

const resizeWorker = new Worker(
  "resize-image",
  async (job) => {
    console.log(job.data);
    const { filePath, outPutPath, width, height, commentId, userId } = job.data;
    const newPathFile = await resizeImage(filePath, outPutPath, width, height);
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        filePath: newPathFile,
        isResizing: false,
      },
    });
    await prisma.file.create({
      data: {
        userId,
        commentId,
        fileName: outPutPath,
        type: "IMAGE",
        url: newPathFile,
      },
    });
  },
  { connection: redisClient }
);

resizeWorker.on("error", (err) => {
  console.error(`Job ${job.id} filed`, err);
});
