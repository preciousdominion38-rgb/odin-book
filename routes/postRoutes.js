const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/feed', postController.getFeed);
router.post('/posts', postController.createPost);
router.post('/posts/:id/like', postController.likePost);

module.exports = router;
