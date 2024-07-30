import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png'; // Import the logo
import bgImage from '../assets/bg.jpg'; // Import the background image

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.email), {
        email: user.email,
      });
      navigate('/dashboard'); // Redirect to dashboard after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginNavigation = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-50" />
      </div>
      <div className="relative w-full max-w-md p-8 bg-white bg-opacity-80 rounded-2xl shadow-lg shadow-gray-400/50 z-10">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Company Logo" className="w-24 h-24 mb-4" />
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">Register</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-primary rounded-lg shadow-lg shadow-gray-400 hover:bg-blue-700 focus:outline-none">
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <button
              onClick={handleLoginNavigation}
              className="mt-2 px-4 py-2 font-bold text-white bg-green-500 rounded-lg shadow-lg shadow-gray-400 hover:bg-green-700 focus:outline-none"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
