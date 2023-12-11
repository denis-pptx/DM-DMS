const router = require('express').Router();

router.use('/genre', require('./genre-router'));
router.use('/auth', require('./auth-router'));

module.exports = router;