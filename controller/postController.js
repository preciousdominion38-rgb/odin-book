const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getFeed = async (req, res) => {
  const posts = await Post.find().populate('author').sort({ createdAt: -1 });
  res.render('feed', { posts });
};

exports.createPost = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const post = new Post({
      author: decoded.id,
      content: req.body.content
    });

    await post.save();
    res.redirect('/feed');
  } catch (error) {
    res.status(400).send('Error creating post: ' + error.message);
  }
};

exports.likePost = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const post = await Post.findById(req.params.id);
    const liked = post.likes.includes(decoded.id);

    if (liked) {
      post.likes.pull(decoded.id);
    } else {
      post.likes.push(decoded.id);
    }

    await post.save();
    res.redirect('/feed');
  } catch (error) {
    res.status(400).send('Error liking post: ' + error.message);
  }
};
