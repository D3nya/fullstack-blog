import mongoose from 'mongoose';
import { CommentModel, PostModel } from '../models/index.js';
import { TagModel } from '../models/index.js';

async function addPostTags(tags) {
  const normalizedTags = tags
    .trim()
    .replaceAll('#', '')
    .replaceAll(' ', '')
    .split(',');

  const postTags = [];

  for (let index = 0; index < normalizedTags.length; index++) {
    const [findedTag] = await TagModel.find({
      title: normalizedTags[index],
    });

    if (findedTag) {
      postTags.push(findedTag?._id);
    } else {
      const tag = new TagModel({ title: `${normalizedTags[index]}` });

      const savedTag = await tag.save();

      postTags.push(savedTag._id);
    }
  }

  return postTags;
}

export const createPost = async (post, tags) => {
  const postTags = await addPostTags(tags);

  const doc = new PostModel({ ...post, tags: postTags });

  const savedPost = await doc.save();

  return savedPost;
};

export const getAllPosts = async (sortBy, findTag, limit, skip, findUser) => {
  let sort;

  if (sortBy === 'new') {
    sort = { _id: -1 };
  } else if (sortBy === 'popular') {
    sort = { viewsCount: -1 };
  } else if (sortBy === 'best') {
    sort = { rating: -1 };
  } else {
    sort = { _id: 1 };
  }

  let postsQuery;
  let totalCount;

  if (findTag) {
    const [tag] = await TagModel.find({ title: findTag });

    if (!tag) {
      throw new Error(`Failed to get posts with tag.`);
    }

    postsQuery = PostModel.find({ tags: { $in: [tag._id] } });
    totalCount = await PostModel.countDocuments({ tags: { $in: [tag._id] } });
  } else if (findUser) {
    postsQuery = PostModel.find({ user: findUser });
    totalCount = await PostModel.countDocuments({ user: findUser });
  } else {
    postsQuery = PostModel.find();
    totalCount = await PostModel.countDocuments();
  }

  const posts = await postsQuery
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('user', {
      firstName: 1,
      lastName: 1,
      avatarUrl: 1,
      login: 1,
      gender: 1,
    })
    .populate('tags', {
      _id: 1,
      title: 1,
    });

  if (!posts) {
    throw new Error(`Failed to get posts.`);
  }

  const modifiedPosts = await Promise.all(
    posts.map(async (post) => {
      const count = await CommentModel.find({
        post: post._id,
      }).countDocuments();

      const rating = await CommentModel.aggregate([
        { $match: { post: new mongoose.Types.ObjectId(post._id) } },
        {
          $group: {
            _id: null,
            amount: { $avg: '$rating' },
          },
        },
      ]);

      let avgRating = 0;
      if (rating.length !== 0) {
        avgRating = rating[0].amount;
      }

      return {
        _id: post._id,
        title: post.title,
        text: post.text,
        tags: post.tags,
        user: post.user,
        viewsCount: post.viewsCount,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        totalComments: count,
        avgRating: avgRating,
      };
    })
  );

  return { posts: modifiedPosts, totalCount };
};

export const getAllTitles = async () => {
  const titles = await PostModel.find().select({ title: 1 });

  if (!titles) {
    throw new Error(`Failed to get titles.`);
  }

  return titles;
};

export const getOnePost = async (id) => {
  const post = await PostModel.findByIdAndUpdate(
    id,
    {
      $inc: { viewsCount: 1 },
    },
    { returnDocument: 'after' }
  )
    .populate('user', {
      firstName: 1,
      lastName: 1,
      avatarUrl: 1,
      login: 1,
      gender: 1,
    })
    .populate('tags', {
      _id: 1,
      title: 1,
    });

  if (!post) {
    throw new Error(`Failed to get post ${id}`);
  }

  const count = await CommentModel.find({
    post: new mongoose.Types.ObjectId(id),
  }).count();

  const rating = await CommentModel.aggregate([
    { $match: { post: new mongoose.Types.ObjectId(id) } },
    {
      $group: {
        _id: null,
        amount: { $avg: '$rating' },
      },
    },
  ]);

  let avgRating;

  if (rating.length !== 0) {
    const [{ amount }] = rating;
    avgRating = amount;
  } else {
    avgRating = 0;
  }

  return { post, avgRating, totalComments: count };
};

export const updatePost = async (postId, userId, post, tags) => {
  const findedPost = await PostModel.findById(postId);

  if (!findedPost.user._id.equals(userId)) {
    throw new Error(`No access to update post ${postId}.`);
  }

  const postTags = await addPostTags(tags);

  const updatedPost = await PostModel.findByIdAndUpdate(postId, {
    ...post,
    tags: postTags,
  })
    .populate('user', {
      firstName: 1,
      lastName: 1,
      avatarUrl: 1,
      login: 1,
      gender: 1,
    })
    .populate('tags', {
      _id: 1,
      title: 1,
    });

  if (!updatedPost) {
    throw new Error(`Failed to update post ${postId}`);
  }

  return updatedPost;
};

export const deletePost = async (postId, userId) => {
  const findedPost = await PostModel.findById(postId);

  if (!findedPost.user._id.equals(userId)) {
    throw new Error(`No access to delete post ${postId}.`);
  }

  const deletedPost = await PostModel.findByIdAndDelete(postId)
    .populate('user', {
      firstName: 1,
      lastName: 1,
      avatarUrl: 1,
      login: 1,
      gender: 1,
    })
    .populate('tags', {
      _id: 1,
      title: 1,
    });

  if (!deletedPost) {
    throw new Error(`Failed to delete post ${id}`);
  }

  return deletedPost;
};
