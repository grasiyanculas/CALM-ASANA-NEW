// src/components/ToggleAuth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import 'boxicons/css/boxicons.min.css';
import './ToggleAuth.css';

function ToggleAuth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || 'Invalid email format';
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const emailValidation = validateEmail(email);
    if (typeof emailValidation === 'string') {
      setError(emailValidation);
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/UserQuestionnaire');
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const emailValidation = validateEmail(email);
    if (typeof emailValidation === 'string') {
      setError(emailValidation);
      return;
    }
    if (!username) {
      setError('Please enter a username.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/UserQuestionnaire');
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setUsername('');
    setEmail('');
    setPassword('');
    setError(null);
  };

  return (
    <div className="toggle-auth-container">
      <div className="relative w-[850px] h-[550px] rounded-3xl overflow-hidden form-container transition-all duration-[1200ms]">
        {/* Login Form */}
        <div className={`absolute right-0 w-1/2 h-full flex items-center justify-center text-center p-10 transition-all duration-600 ease-in-out ${isSignIn ? 'z-10 opacity-100' : 'z-0 opacity-0 translate-x-full pointer-events-none'}`}>
          <form onSubmit={handleLoginSubmit} className="w-full">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">Login</h1>
            {error && isSignIn && <p className="text-red-500 mb-4 error-text">{error}</p>}
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="w-full p-3 pl-10 rounded-lg form-input"
                required
              />
              <i className="bx bxs-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-xl"></i>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg form-input"
                required
              />
              <i className="bx bxs-lock-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-xl"></i>
            </div>
            <button type="submit" className="form-button w-full py-3 rounded-lg text-white font-semibold">Login</button>
          </form>
        </div>

        {/* Register Form */}
        <div className={`absolute left-0 w-1/2 h-full flex items-center justify-center text-center p-10 transition-all duration-600 ease-in-out ${!isSignIn ? 'z-10 opacity-100' : 'z-0 opacity-0 -translate-x-full pointer-events-none'}`}>
          <form onSubmit={handleRegisterSubmit} className="w-full">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">Register</h1>
            {error && !isSignIn && <p className="text-red-500 mb-4 error-text">{error}</p>}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg form-input"
                required
              />
              <i className="bx bxs-user absolute left-3 top-1/2 transform -translate-y-1/2 text-xl"></i>
            </div>
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="w-full p-3 pl-10 rounded-lg form-input"
                required
              />
              <i className="bx bxs-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-xl"></i>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg form-input"
                required
              />
              <i className="bx bxs-lock-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-xl"></i>
            </div>
            <button type="submit" className="form-button w-full py-3 rounded-lg text-white font-semibold">Register</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className={`absolute top-0 h-full w-1/2 flex flex-col justify-center items-center text-white transition-all duration-[1200ms] toggle-panel ${isSignIn ? 'left-0' : 'left-1/2'}`}>
          <h1 className="text-3xl font-bold mb-4">{isSignIn ? 'Hello, Welcome!' : 'Welcome Back!'}</h1>
          <p className="mb-6">{isSignIn ? 'Don’t have an account?' : 'Already have an account?'}</p>
          <button onClick={toggleForm} className="toggle-panel-button w-40 py-2 border-2 border-white rounded-lg text-white font-semibold">
            {isSignIn ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToggleAuth;
