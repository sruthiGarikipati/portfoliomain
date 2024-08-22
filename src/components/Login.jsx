import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import './LoginRegister.css';

const Login = ({ setIsRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/welcome');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Login error:', error.message);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="form-box login">
      <form onSubmit={handleSubmit}>
        <h1 className="white-text">Login</h1>
        {errorMessage && <p className="message error white-text">{errorMessage}</p>}
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash className="icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="icon" onClick={togglePasswordVisibility} />
          )}
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <button
            type="button"
            className="forgot-password-link"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit">Login</button>
        <div className="register-link">
          <p className="white-text">Don't have an account? 
            <button 
              type="button" 
              className="white-text" 
              onClick={() => setIsRegister(true)}>
                Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
