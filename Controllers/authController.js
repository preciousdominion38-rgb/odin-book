const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/feed');
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
