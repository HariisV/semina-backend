const express = require('express');
const router = express();

const { create } = require('./controller');

router.get('/', create);

module.exports = router;
