// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Connected");
});

// JWT Secret
app.set('jwtSecret', process.env.JWT_SECRET);

// Routes
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
