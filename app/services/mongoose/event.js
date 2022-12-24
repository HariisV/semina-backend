const Events = require('../../api/v1/events/model');
const { checkingImage } = require('./images');
const { checkingCategories } = require('./categories');
const { checkingTalents } = require('./talents');
const { BadRequest, NotFound } = require('../../errors');

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query;
  let condition = {};
  if (keyword)
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  if (category) condition = { ...condition, category: category };
  if (talent) condition = { ...condition, talent };

  const result = await Events.find(condition)
    .populate({ path: 'image', select: '_id name' })
    .populate({ path: 'category', select: '_id name' })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id name' },
    });

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const check = await Events.find({ title });
  if (check.length) throw new BadRequest('Name Has Been Used');

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  });

  console.log(result);

  return result;
};
const getOneEvents = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate({ path: 'image', select: '_id name' })
    .populate({ path: 'category', select: '_id name' })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id name' },
    });

  // if (!result) throw new NotFound(`Events Not Found With Id : ${id}`);
  if (!result) throw new NotFound(`Tidak Ada Kategori Dengan Id : ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const check = await Events.findOne({ title, _id: { $ne: id } });
  if (check) throw new BadRequest('Name Has Been Used');

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
    },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFound(`Events Not Found With Id : ${id}`);

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  // const checking = await Events.findById(id);
  // if (!checking) throw new NotFound(`Events Not Found With Id : ${id}`);

  const result = await Events.findOneAndDelete({ _id: id });
  if (!result) throw new NotFound(`Events Not Found With Id : ${id}`);
  return result;
};

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
};
