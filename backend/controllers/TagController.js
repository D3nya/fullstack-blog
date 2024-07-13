import { TagService } from '../services/index.js';

export const addTag = async (req, res) => {
  try {
    const tag = { title: req.body.title };

    const savedTag = await TagService.addTag(tag);

    res.json(savedTag);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to add tag',
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagService.getAllTags();

    res.json(tags);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get all tags',
    });
  }
};

export const getOneTag = async (req, res) => {
  try {
    const tag = req.params.tag;

    const findedTag = await TagService.getOneTag(tag);

    res.json(findedTag);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to get tag',
    });
  }
};
