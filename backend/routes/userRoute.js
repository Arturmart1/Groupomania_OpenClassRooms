const express = require('express');
const router = express.Router();
const limiter = require('../middleware/expressLimiter');

const userController = require('../controllers/user');

router.post ('/signup', userController.signUp);
router.post ('/login', userController.login, limiter.max);
router.put ('/updateUser', userController.modifyUser);
router.delete ('/deleteUser', userController.deleteUser);

module.exports = router;