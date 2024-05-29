import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import HomePage from './pages/HomePage';
import RandomJoke from './pages/RandomJoke';
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
          // Clear invalid or expired token
          Cookies.remove('token');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        // Clear invalid token on any decoding error
        Cookies.remove('token');
      }
    }
  }, []);

  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              // Conditionally render LoginForm if not authenticated
              !isAuthenticated ? (
                <LoginForm />
              ) : (
                <HomePage/>
              )
            }
          />
          <Route
            path="/foodjoke"
            element={
              // Conditionally render LoginForm if not authenticated
              !isAuthenticated ? (
                <LoginForm />
              ) : (
                <RandomJoke/>
              )
            }
          />
          {/* Add protected routes here (e.g., `/dashboard`) */}
          <Route path="/register" element={<SignupForm/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
