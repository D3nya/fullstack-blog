import { PostService } from '../services/index.js';

export const createPost = async (req, res) => {
  try {
    const tags = req.body.tags;

    const post = {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    };

    const savedPost = await PostService.createPost(post, tags);

    res.json(savedPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to create post',
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const sortBy = req.query.sortBy;
    const findTag = req.query.tag;
    const findUser = req.query.findUser;
    const limit = req.query.limit;
    const skip = req.query.skip;

    const { posts, totalCount } = await PostService.getAllPosts(
      sortBy,
      findTag,
      limit,
      skip,
      findUser
    );

    res.setHeader('X-total-count', totalCount);
    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get posts',
      error: error.message,
    });
  }
};

export const getAllTitles = async (req, res) => {
  try {
    const titles = await PostService.getAllTitles();

    res.json(titles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get titles',
      error: error.message,
    });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const id = req.params.id;

    const { post, avgRating, totalComments } = await PostService.getOnePost(id);

    res.json({
      _id: post._id,
      title: post.title,
      text: post.text,
      tags: post.tags,
      user: post.user,
      viewsCount: post.viewsCount,
      imageUrl: post.imageUrl,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      avgRating,
      totalComments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get post',
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const tags = req.body.tags;

    const post = {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    };

    const updatedPost = await PostService.updatePost(
      postId,
      userId,
      post,
      tags
    );

    res.json(updatedPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to update post',
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const deletedPost = await PostService.deletePost(postId, userId);

    res.json(deletedPost);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to delete post',
      error: error.message,
    });
  }
};
