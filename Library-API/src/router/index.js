const router = require('express').Router();

router.use('/auth', require('./auth-router'));
router.use('/genre', require('./genre-router'));
router.use('/publisher', require('./publisher-router'));

module.exports = router;