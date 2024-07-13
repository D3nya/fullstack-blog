import { CommentService } from '../services/index.js';

export const createComment = async (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      rating: req.body.rating,
      post: req.body.post,
      user: req.userId,
    };

    const savedComment = await CommentService.createComment(comment);

    res.json(savedComment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to create comment',
      error: error.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const sortBy = req.query.sortBy;
    const postId = req.query.postId;

    const comments = await CommentService.getAllComments(sortBy, postId);

    res.json(comments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get comments',
      error: error.message,
    });
  }
};

export const getOneComment = async (req, res) => {
  try {
    const id = req.params.id;

    const comment = await CommentService.getOneComment(id);

    res.json(comment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get comment',
      error: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.userId;

    const comment = {
      text: req.body.text,
      rating: req.body.rating,
    };

    const updatedComment = await CommentService.updateComment(
      commentId,
      userId,
      comment
    );

    res.json(updatedComment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update comment',
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.userId;

    const deletedComment = await CommentService.deleteComment(
      commentId,
      userId
    );

    res.json(deletedComment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to delete comment',
      error: error.message,
    });
  }
};
