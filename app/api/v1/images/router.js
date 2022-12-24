const express = require('express');
const router = express();

const { create } = require('./controller');
const upload = require('../../../middlewares/multer');
// router
// router.get('/', index);
// router.get('/:id', find);
router.post('/', upload.single('avatar'), create);
// router.put('/:id', update);
// router.delete('/:id', destroy);

module.exports = router;
