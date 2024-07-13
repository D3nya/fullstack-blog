import { UserService } from '../services/index.js';

export const register = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.login,
      gender: req.body.gender,
      password: req.body.password,
      avatarUrl: req.body.avatarUrl,
    };

    const { savedUser, token } = await UserService.register(user);

    res.json({
      firstName: savedUser._doc.firstName,
      lastName: savedUser._doc.lastName,
      email: savedUser._doc.email,
      login: savedUser._doc.login,
      gender: savedUser._doc.gender,
      favourites: savedUser._doc.favourites,
      avatarUrl: savedUser._doc.avatarUrl,
      createdAt: savedUser._doc.createdAt,
      _id: savedUser._doc._id,
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Registration failed',
    });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email,
      login = req.body.login,
      password = req.body.password;

    const { user, token } = await UserService.login(email, login, password);

    res.json({
      firstName: user._doc.firstName,
      lastName: user._doc.lastName,
      email: user._doc.email,
      login: user._doc.login,
      gender: user._doc.gender,
      favourites: user._doc.favourites,
      avatarUrl: user._doc.avatarUrl,
      createdAt: user._doc.createdAt,
      _id: user._doc._id,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Authorization failed',
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const id = req.userId;

    const user = await UserService.getMe(id);

    res.json({
      firstName: user._doc.firstName,
      lastName: user._doc.lastName,
      email: user._doc.email,
      login: user._doc.login,
      gender: user._doc.gender,
      favourites: user._doc.favourites,
      avatarUrl: user._doc.avatarUrl,
      createdAt: user._doc.createdAt,
      _id: user._doc._id,
    });
  } catch (error) {
    res.status(500).json({
      message: 'No access',
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const authId = req.userId;

    const user = await UserService.getOneUser(userId, authId);

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get user',
      error: error.message,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.login,
      gender: req.body.gender,
      avatarUrl: req.body.avatarUrl,
    };

    const userId = req.params.id;
    const userAuthId = req.userId;

    console.log(userId, userAuthId);

    if (userId !== userAuthId) {
      throw new Error(`No access to edit this user`);
    }

    const editedUser = await UserService.editUser(user, userId);

    res.json({
      firstName: editedUser._doc.firstName,
      lastName: editedUser._doc.lastName,
      email: editedUser._doc.email,
      login: editedUser._doc.login,
      gender: editedUser._doc.gender,
      favourites: editedUser._doc.favourites,
      avatarUrl: editedUser._doc.avatarUrl,
      createdAt: editedUser._doc.createdAt,
      _id: editedUser._doc._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to edit user',
      error: error.message,
    });
  }
};

export const addFavourite = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.userId;

    const user = await UserService.addFavourite(userId, postId);

    res.json({
      firstName: user._doc.firstName,
      lastName: user._doc.lastName,
      email: user._doc.email,
      login: user._doc.login,
      gender: user._doc.gender,
      favourites: user._doc.favourites,
      avatarUrl: user._doc.avatarUrl,
      createdAt: user._doc.createdAt,
      _id: user._doc._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to add favourite',
      error: error.message,
    });
  }
};

export const deleteFavourite = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.userId;

    const deletedUser = await UserService.deleteFavourite(userId, postId);

    res.json({
      firstName: deletedUser._doc.firstName,
      lastName: deletedUser._doc.lastName,
      email: deletedUser._doc.email,
      login: deletedUser._doc.login,
      gender: deletedUser._doc.gender,
      favourites: deletedUser._doc.favourites,
      avatarUrl: deletedUser._doc.avatarUrl,
      createdAt: deletedUser._doc.createdAt,
      _id: deletedUser._doc._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to delete favourite',
      error: error.message,
    });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const userId = req.userId;

    const favourites = await UserService.getAllFavourites(userId);

    res.json(favourites._doc.favourites);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get favourites',
      error: error.message,
    });
  }
};
