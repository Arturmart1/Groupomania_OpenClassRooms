const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

router.get('/', postController.gets);
//router.get('/:id', postController.getOnePost);
router.post('/', postController.newPost);
//router.put('/:id', postController.modifyPost);
//router.delete('/:id', postController.deletePost);

module.exports = router;