import React, { useState } from 'react';
import { createUser, fetchForm } from '../api/api';

function Login({ onLoginSuccess }) {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUser(rollNumber, name);
      onLoginSuccess(rollNumber);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        try {
          const formData = await fetchForm(rollNumber);
          onLoginSuccess(rollNumber);
        } catch (fetchErr) {
          setError('User exists but form could not be loaded.');
        }
      } else {
        setError('Login failed. Try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="w-14 h-14 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-6 py-10 animate-fade-in">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-[1.02] transition duration-300">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">Student Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {error && <div className="text-red-500 text-sm font-medium text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;