const express = require('express');
const router = express();
const { signIn } = require('./controller');

router.post('/login', signIn);

module.exports = router;
