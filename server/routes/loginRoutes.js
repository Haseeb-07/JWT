// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Route to login user
router.post('/login', loginController.loginUser);

module.exports = router;
