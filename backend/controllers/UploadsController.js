export const uploads = (req, res) => {
  try {
    res.json({
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      size: req.file.size,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to upload',
    });
  }
};
