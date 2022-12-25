const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// Version
const v1 = '/api/v1';

// Middleware
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handle-error');

// Router
const categoriesRouter = require('./app/api/v1/categories/router');
const imagesRouter = require('./app/api/v1/images/router');
const talentRouter = require('./app/api/v1/talents/router');
const eventRouter = require('./app/api/v1/events/router');
const organizerRouter = require('./app/api/v1/organizer/router');
const authRouter = require('./app/api/v1/auth/router');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${v1}/categories`, categoriesRouter);
app.use(`${v1}/images`, imagesRouter);
app.use(`${v1}/talents`, talentRouter);
app.use(`${v1}/events`, eventRouter);
app.use(`${v1}/organizer`, organizerRouter);
app.use(`${v1}/auth`, authRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);
module.exports = app;
