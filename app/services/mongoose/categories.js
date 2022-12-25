const Category = require('../../api/v1/categories/model');
const { BadRequest, NotFound } = require('../../errors');

const getAllCategories = async (req) => {
  const result = await Category.find({ organizer: req.user.organizer });
  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Category.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFound(`Tidak Ada Kategori Dengan Id : ${id}`);
  return result;
};

const createCategories = async (req) => {
  const check = await Category.find({ name });
  if (check.length) throw new BadRequest('Nama Kategory Harus Unik');

  const result = await Category.create({ name, organizer: req.user.organizer });
  return result;
};

const updateCategoriest = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Category.find({
    _id: { $ne: id },
    name,
    organizer: req.user.organizer,
  });
  if (check.length) throw new BadRequest('Nama Kategory Harus Unik');

  const result = await Category.findOneAndUpdate(
    { _id: id },
    { name },
    { runValidators: true, new: true }
  );
  if (!result) throw new NotFound(`Tidak Ada Kategori Dengan Id : ${id}`);

  return result;
};

const deleteCategoriest = async (req) => {
  const { id } = req.params;
  const result = await Category.findOne({ _id: id });
  if (!result) throw new NotFound(`Tidak Ada Kategori Dengan Id : ${id}`);
  await result.remove();
  return result;
};

const checkingCategories = async (id) => {
  const result = await Category.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result)
    throw new BadRequest(`Tidak Ada Kategori Dengan Id : ${category}`);
  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategoriest,
  deleteCategoriest,
  checkingCategories,
};
