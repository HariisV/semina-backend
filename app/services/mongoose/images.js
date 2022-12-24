const Images = require('../../api/v1/images/model');

const generateUrlImage = async (req, res, next) => {
  const result = `uploads/${req.file.filename}`;
  return result;
};

const createImages = async (req, res, next) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  });

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) throw new Error(`Image not found with Id: ${id}`);
  return result;
};

module.exports = { createImages, checkingImage };
