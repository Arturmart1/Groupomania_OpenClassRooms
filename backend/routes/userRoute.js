const express = require('express');
const router = express.Router();
const limiter = require('../middleware/expressLimiter');

const auth = require('../middleware/auth');

const userController = require('../controllers/user');

router.post ('/signup', userController.signup);
//router.post ('/login',auth, userController.login, limiter.max);
//router.get('/:id',auth, userController.getUser);
//router.put ('/id',auth,  userController.modifyUser);
//router.delete ('/id',auth, userController.deleteUser);

module.exports = router;