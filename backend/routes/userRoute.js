const express = require('express');
const router = express.Router();
const limiter = require('../middleware/expressLimiter');
const auth = require('../middleware/auth');
const userController = require('../controllers/user');

router.post ('/signup', userController.signup);
router.post ('/login', userController.login, limiter.max);
router.get('/allusers',auth, userController.getAllUsers);
router.get('/:id', auth, userController.getOneUser);
router.put ('/update/:id',auth, userController.modifyUser);
router.delete ('/delete/:id',auth, userController.deleteUser);

module.exports = router;