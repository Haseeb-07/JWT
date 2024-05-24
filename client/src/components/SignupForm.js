// components/SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/signup/register', formData);
            toast.success('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error.response.data);
            toast.error(error.response.data.message || 'Error registering user');
        }
    };

    return (
        <div>
            <h2>Sign Up Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
