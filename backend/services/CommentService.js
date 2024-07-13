import { CommentModel } from '../models/index.js';

export const createComment = async (comment) => {
  const doc = new CommentModel(comment);

  const savedComment = await doc
    .save()
    .then((comment) =>
      comment.populate('user', {
        firstName: 1,
        lastName: 1,
        avatarUrl: 1,
        login: 1,
        gender: 1,
      })
    )
    .then((comment) =>
      comment.populate('post', {
        _id: 1,
        title: 1,
        text: 1,
        tage: 1,
        viewsCount: 1,
        rating: 1,
        imageUrl: 1,
        createdAt: 1,
      })
    );

  return savedComment;
};

export const getAllComments = async (sortBy, postId) => {
  let comments;

  if (postId) {
    comments = CommentModel.find({ post: postId })
      .populate('user', {
        firstName: 1,
        lastName: 1,
        avatarUrl: 1,
        login: 1,
        gender: 1,
      })
      .populate('post', {
        _id: 1,
        title: 1,
        text: 1,
        tage: 1,
        viewsCount: 1,
        rating: 1,
        imageUrl: 1,
        createdAt: 1,
      });
  } else {
    comments = CommentModel.find()
      .populate('user', {
        firstName: 1,
        lastName: 1,
        avatarUrl: 1,
        login: 1,
        gender: 1,
      })
      .populate('post', {
        _id: 1,
        title: 1,
        text: 1,
        tage: 1,
        viewsCount: 1,
        rating: 1,
        imageUrl: 1,
        createdAt: 1,
      });
  }

  if (sortBy === 'new') {
    comments.sort({ _id: -1 });
  } else if (sortBy === 'all') {
    comments.sort({ _id: 1 });
  }

  if (!comments) {
    throw new Error(`Failed to get comments.`);
  }

  return comments;
};

export const getOneComment = async (id) => {
  const comment = await CommentModel.findById(id)
    .populate('user', {
      firstName: 1,
      lastName: 1,
      avatarUrl: 1,
      login: 1,
      gender: 1,
    })
    .populate('post', {
      _id: 1,
      title: 1,
      text: 1,
      tage: 1,
      viewsCount: 1,
      rating: 1,
      imageUrl: 1,
      createdAt: 1,
    });

  if (!comment) {
    throw new Error(`Failed to get comment ${id}`);
  }

  return comment;
};

export const updateComment = async (commentId, userId, comment) => {
  const findedComment = await CommentModel.findById(commentId);

  if (!findedComment.user._id.equals(userId)) {
    throw new Error(`No access to update comment ${commentId}.`);
  }

  const updatedComment = await CommentModel.findByIdAndUpdate(
    commentId,
    comment
  );

  if (!updatedComment) {
    throw new Error(`Failed to update comment ${commentId}`);
  }

  return updatedComment;
};

export const deleteComment = async (commentId, userId) => {
  const findedComment = await CommentModel.findById(commentId);

  if (!findedComment.user._id.equals(userId)) {
    throw new Error(`No access to delete comment ${commentId}.`);
  }
  const deletedComment = await CommentModel.findByIdAndDelete(commentId)
    .populate('user', {
      firstName: 1,
      lastName: 1,
      avatarUrl: 1,
      login: 1,
      gender: 1,
    })
    .populate('post', {
      _id: 1,
      title: 1,
      text: 1,
      tage: 1,
      viewsCount: 1,
      rating: 1,
      imageUrl: 1,
      createdAt: 1,
    });

  if (!deletedComment) {
    throw new Error(`Failed to delete comment ${commentId}`);
  }

  return deletedComment;
};
