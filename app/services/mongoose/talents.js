const { checkingImage } = require('./images');
const Talent = require('../../api/v1/talents/model');
const { BadRequest, NotFound } = require('../../errors');

const getAllTalents = async (req) => {
  const { keywoard } = req.query;
  let condition = {};

  if (keywoard) {
    condition = { ...condition, name: { $regex: keywoard, $options: 'i' } };
  }

  const result = await Talent.find(condition)
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id name role image');

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  await checkingImage(image);

  const check = await Talent.findOne({ name });
  if (check) throw new BadRequest('Talent already exists');

  const result = await Talent.create({ name, role, image });
  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talent.findById(id)
    .populate({
      path: 'user',
      select: '_id name',
    })
    .select('_id name role image');

  if (!result) throw new NotFound('Talent not found');

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  await checkingImage(image);
  const check = await Talent.findOne({ name, _id: { $ne: id } });

  if (check) throw new BadRequest('Talent already exists');

  const result = await Talent.findOneAndUpdate(
    { _id: id },
    { name, role, image },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFound(`Talent with Id : ${id} not found`);

  return result;
};
const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talent.findOneAndDelete({ _id: id });

  if (!result) throw new NotFound(`Talent with Id : ${id} not found`);

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talent.findOne({ _id: id });
  if (!result) throw new Error(`Image not found with Id: ${id}`);
  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents,
};
