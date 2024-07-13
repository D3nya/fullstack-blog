import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CommentModel, PostModel, UserModel } from '../models/index.js';

export const register = async (user) => {
  const { password, ...userWithoutPassword } = user;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    ...userWithoutPassword,
    passwordHash,
  });

  const savedUser = await doc.save();

  const token = jwt.sign(
    {
      _id: doc._id,
    },
    's3cr3t',
    { expiresIn: '30d' }
  );

  return { savedUser, token };
};

export const login = async (email, login, password) => {
  let user;

  if (email) {
    user = await UserModel.findOne({ email }).populate({
      path: 'favourites',
      populate: { path: 'tags user' },
      select: {
        _id: 1,
        title: 1,
        text: 1,
        tags: 1,
        user: 1,
        viewsCount: 1,
        imageUrl: 1,
        createdAt: 1,
      },
    });
  } else if (login) {
    user = await UserModel.findOne({ login }).populate({
      path: 'favourites',
      populate: { path: 'tags user' },
      select: {
        _id: 1,
        title: 1,
        text: 1,
        tags: 1,
        user: 1,
        viewsCount: 1,
        imageUrl: 1,
        createdAt: 1,
      },
    });
  } else {
    throw new Error('You must pass login or email');
  }

  if (!user) {
    throw new Error('User not found');
  }

  const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);

  if (!isValidPass) {
    throw new Error('Invalid login or password');
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    's3cr3t',
    { expiresIn: '30d' }
  );

  return { user, token };
};

export const getMe = async (id) => {
  const user = await UserModel.findById(id).populate({
    path: 'favourites',
    populate: { path: 'tags user' },
    select: {
      _id: 1,
      title: 1,
      text: 1,
      tags: 1,
      user: 1,
      viewsCount: 1,
      imageUrl: 1,
      createdAt: 1,
    },
  });

  if (!user) {
    throw new Error(`User not found with id: ${id}`);
  }

  return user;
};

export const getOneUser = async (userId, authId) => {
  const user = await UserModel.findById(userId).populate({
    path: 'favourites',
    populate: { path: 'tags user' },
    select: {
      _id: 1,
      title: 1,
      text: 1,
      tags: 1,
      user: 1,
      viewsCount: 1,
      imageUrl: 1,
      createdAt: 1,
    },
  });

  if (!user) {
    throw new Error(`User not found with id: ${id}`);
  }

  const userPostsCount = await PostModel.countDocuments({ user: userId });
  const userCommentsCount = await CommentModel.countDocuments({ user: userId });
  const userFavouriteCount = user.favourites.length;

  const sendedUser = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    login: user.login,
    gender: user.gender,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    postsCount: userPostsCount,
    commentsCount: userCommentsCount,
  };

  if (userId === authId) {
    sendedUser.email = user.email;
    sendedUser.favourites = user.favourites;
    sendedUser.updatedAt = user.updatedAt;
    sendedUser.favouritesCount = userFavouriteCount;
  }

  return sendedUser;
};

export const editUser = async (user, userId) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
    new: true,
  }).populate({
    path: 'favourites',
    populate: { path: 'tags user' },
    select: {
      _id: 1,
      title: 1,
      text: 1,
      tags: 1,
      user: 1,
      viewsCount: 1,
      imageUrl: 1,
      createdAt: 1,
    },
  });

  if (!updatedUser) {
    throw new Error(`Failed to update post ${postId}`);
  }

  return updatedUser;
};

export const addFavourite = async (userId, postId) => {
  const findedPost = await PostModel.findById(postId);

  if (!findedPost) {
    throw new Error(`Post not found with id: ${postId}`);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $addToSet: { favourites: postId },
    },
    { new: true }
  ).populate({
    path: 'favourites',
    populate: { path: 'tags user' },
    select: {
      _id: 1,
      title: 1,
      text: 1,
      tags: 1,
      user: 1,
      viewsCount: 1,
      imageUrl: 1,
      createdAt: 1,
    },
  });

  if (!updatedUser) {
    throw new Error(`Error adding to favorites`);
  }

  return updatedUser;
};

export const deleteFavourite = async (userId, postId) => {
  const findedPost = await PostModel.findById(postId);

  if (!findedPost) {
    throw new Error(`Post not found with id: ${postId}`);
  }

  const deletedFavourite = await UserModel.findByIdAndUpdate(
    userId,
    {
      $pull: { favourites: postId },
    },
    { new: true }
  ).populate({
    path: 'favourites',
    populate: { path: 'tags user' },
    select: {
      _id: 1,
      title: 1,
      text: 1,
      tags: 1,
      user: 1,
      viewsCount: 1,
      imageUrl: 1,
      createdAt: 1,
    },
  });

  if (!deletedFavourite) {
    throw new Error(`Failed to delete favourite`);
  }

  return deletedFavourite;
};

export const getAllFavourites = async (userId) => {
  const favourites = await UserModel.findById(userId, {
    favourites: 1,
    _id: false,
  }).populate({
    path: 'favourites',
    populate: { path: 'tags user' },
    select: {
      _id: 1,
      title: 1,
      text: 1,
      tags: 1,
      user: 1,
      viewsCount: 1,
      imageUrl: 1,
      createdAt: 1,
    },
  });

  return favourites;
};
