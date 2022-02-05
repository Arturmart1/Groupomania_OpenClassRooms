const express = require('express');
const router = express.Router();
const limiter = require('../middleware/expressLimiter');
const auth = require('../middleware/auth');
const userController = require('../controllers/user');

router.post ('/signup', userController.signup);
router.post ('/login', userController.login, limiter.max);
router.get('/',auth, userController.gets);
router.get('/:id', auth, userController.getOneUser);
router.put ('/:id',auth,  userController.modifyUser);
router.delete ('/:id',auth, userController.deleteUser);

module.exports = router;