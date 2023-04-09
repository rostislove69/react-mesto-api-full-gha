const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { messages } = require('../utils/constants');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use((req, res, next) => {
  next(new NotFoundError(messages.pageNotFound));
});

module.exports = router;
