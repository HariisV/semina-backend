const notFound = (req, res) => {
  res.status(404).send({ msg: 'No Anything In Here' });
};
module.exports = notFound;
