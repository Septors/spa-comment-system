import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export const resizeImage = async (filePath, outputFileName, width, height) => {
  const outputPath = path.join("../../uploads", "resized" + outputFileName);

  await sharp(filePath).resize(width, height).toFile(outputPath);

  await fs.unlink(filePath);

  return outputPath;
};

export const checkImageSize = async (filePath) => {
  const { width, height } = await sharp(filePath).metadata();
  return { width, height };
};
