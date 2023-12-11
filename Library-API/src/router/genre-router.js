const router = require('express').Router();
const controller = require('../controllers/genre-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

router.get('/', controller.getAll);
router.get('/:id', authMiddleware, controller.getById);
router.post('/', [authMiddleware, adminMiddleware], controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
