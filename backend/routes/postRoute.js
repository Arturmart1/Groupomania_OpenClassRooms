const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.post('/', postController.createPost);
router.put('/:id', postController.modifyPost);
router.delete('/:id', postController.deletePost);

module.exports = router;