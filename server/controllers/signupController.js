const bcrypt = require('bcrypt');
const SignupUser = require('../models/signupUserModel');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if email already exists
        let existingUser = await SignupUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Check if username already exists
        existingUser = await SignupUser.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new SignupUser({
            username,
            email,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
