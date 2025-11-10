exports.getTribute = (req, res) => {
  res.render('tribute', {
    message: "This project is dedicated to The Odin Project — a beacon of open learning, collaboration, and growth. Thank you for shaping developers across the world, including me. 💛"
  });
};
