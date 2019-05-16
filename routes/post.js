const express = require('express');
const postController = require('../controllers/post');
const validatePostId = require('../middleware/validatePostId');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', postController.fetchPosts);
router.post('/', auth, postController.addPost);
router.get('/:id', validatePostId, postController.fetchPost);
router.put('/:id', [auth, validatePostId], postController.updatePost);
router.delete('/:id', [auth, validatePostId], postController.deletePost);

module.exports = router;
