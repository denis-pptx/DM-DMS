const router = require('express').Router();
const genreRouter = require('./genre-router');

router.use('/genre', genreRouter);

module.exports = router;