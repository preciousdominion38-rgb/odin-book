require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const tributeRoutes = require('./routes/tributeRoutes');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve CSS & JS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// EJS setup
app.use(expressLayouts);
app.set('layout', 'layout'); // Use layout.ejs as default
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use(authRoutes);
app.use(postRoutes);
app.use(tributeRoutes);

// Home redirect
app.get('/', (req, res) => {
  res.redirect('/feed');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
