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
        console.warn('User already exists. Fetching form...');
        try {
          const formData = await fetchForm(rollNumber);
          console.log('Fetched form:', formData);
          onLoginSuccess(rollNumber);
        } catch (fetchErr) {
          console.error('Failed to fetch form JSON:', fetchErr);
          setError('User exists but form could not be loaded.');
        }
      } else {
        setError('Login failed. Try again.');
        console.error('Unexpected error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-6 py-10 animate-fade-in">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transition-transform duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Student Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
