// components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login/login', formData);
            toast.success('User logged in successfully');
            // Store the JWT token in cookies
            Cookies.set('token', response.data.token, { expires: 1 });
            // Refresh the page to update the authentication state
            window.location.reload();
        } catch (error) {
            console.error('Error logging in user:', error.response.data);
            toast.error(error.response.data.message || 'Error logging in user');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
