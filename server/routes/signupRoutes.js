// routes/signupRoutes.js
const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

// Route to register a new user
router.post('/register', signupController.registerUser);

module.exports = router;
