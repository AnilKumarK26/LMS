import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Add animation class when component mounts
  useEffect(() => {
    document.body.classList.add('login-page');
    
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);
  
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    
    // Clear any previous error when user types
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      localStorage.setItem("mail", loginData.email);
      const data = await response.json();
      console.log(data);
      
      // Add a small delay for better UX
      setTimeout(() => {
        navigate("/courses");
      }, 300);
      
    } catch (error) {
      console.error('Error:', error.message);
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create tech pattern effect (purely visual)
  const createTechPattern = () => {
    // This is handled in CSS for better performance
    return null;
  };

  return (
    <div className="login-container">
      <div className="image-container">
        {createTechPattern()}
      </div>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="username">Email:</label>
        <input
          type="email"
          id="username"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        
        {loginError && <p className="error-message">{loginError}</p>}
        
        <a href="forgot-password">Forgot Password?</a>

        <button 
          type="submit" 
          className="login-form-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;