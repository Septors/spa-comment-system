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

export const getComment = async (req, res) => {
  const queryData = req.query;
  if (Object.keys(queryData).length === 0) {
    const lifoComment = await commentService.getLifoComments();
    res.json(lifoComment);
  } else {
    const resultFilter = await commentService.getFilterComments(queryData);
    res.json(resultFilter);
  }
};
