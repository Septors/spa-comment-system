import * as commentService from "../services/comment.service.js";

export const createComment = async (req, res) => {
  const commentData = req.body;
  const userId = req.user.id;
  const fileData = req.file;

  if (fileData) {
    await commentService.createCommentWithFile(userId, commentData, fileData);
    res.status(201).json({ message: "Comment creted" });
  } else {
    await commentService.createComment(userId, commentData);
    res.status(201).json({ message: "Comment created" });
  }
};
