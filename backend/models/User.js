import mongoose, { Schema } from 'mongoose';

const genders = ['male', 'female', 'other'];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    login: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: genders,
    },
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    avatarUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
