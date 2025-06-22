import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve("uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}${ext}`);
  },
});

const allowedMimeType = ["image/jpeg", "image/gif", "image/png", "text/plain"];

const fileFilter = (req, file, cb) => {
  const isValid = allowedMimeType.includes(file.mimetype);

  cb(null, isValid);
};

const limits = { fileSize: 100 * 1024 };

export const upload = multer({
  storage,
  fileFilter,
  limits,
});
