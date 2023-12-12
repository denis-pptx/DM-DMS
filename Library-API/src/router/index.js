const router = require('express').Router();

router.use('/auth', require('./auth-router'));
router.use('/genre', require('./genre-router'));
router.use('/publisher', require('./publisher-router'));
router.use('/author', require('./author-router'));
router.use('/language', require('./language-router'));
router.use('/book_format', require('./book-format-router'));

module.exports = router;