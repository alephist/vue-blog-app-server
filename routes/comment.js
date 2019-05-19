const express = require('express');
const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');
const validatePostId = require('../middleware/validatePostId');
const validateCommentId = require('../middleware/validateCommentId');
const router = express.Router({ mergeParams: true });

router.post('/', [auth, validatePostId], commentController.addComment);
router.get('/:commentId', [auth, validatePostId, validateCommentId], commentController.fetchComment);
router.put('/:commentId', [auth, validatePostId, validateCommentId], commentController.updateComment);
router.delete('/:commentId', [auth, validatePostId, validateCommentId], commentController.deleteComment);

module.exports = router;
