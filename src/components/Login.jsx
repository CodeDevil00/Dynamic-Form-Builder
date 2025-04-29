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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">Student Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
