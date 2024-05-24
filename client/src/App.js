// App.js
import React, { useEffect, useState } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    setIsAuthenticated(true);
                } else {
                    Cookies.remove('token');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                Cookies.remove('token');
            }
        }
    }, []);

    return (
        <div>
            <Toaster />
            {isAuthenticated ? (
                <h2>You can access the App</h2>
            ) : (
                <>
                    <SignupForm />
                    <LoginForm />
                </>
            )}
        </div>
    );
};

export default App;
