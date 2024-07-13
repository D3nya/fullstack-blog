import { TagModel } from '../models/index.js';

export const addTag = async (tag) => {
  const doc = new TagModel(tag);

  const savedTag = await doc.save();

  return savedTag;
};

export const getAllTags = async () => {
  const tags = await TagModel.find();
  return tags;
};

export const getOneTag = async (tag) => {
  const findedTag = await TagModel.findOne({ title: tag });

  if (!findedTag) {
    return {
      message: `Failed to get tag ${tag}`,
    };
  }

  return findedTag;
};
