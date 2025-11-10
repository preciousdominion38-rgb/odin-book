const express = require('express');
const router = express.Router();
const tributeController = require('../controllers/tributeController');

router.get('/tribute', tributeController.getTribute);

module.exports = router;
