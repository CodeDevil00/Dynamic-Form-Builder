import React, { useState } from 'react';
import Login from './components/Login';
import { fetchForm } from './api/api';
import DynamicForm from './components/DynamicForm';

function App() {
  const [rollNumber, setRollNumber] = useState(null);
  const [formResponse, setFormResponse] = useState(null);

  const handleLoginSuccess = async (rollNumber) => {
    setRollNumber(rollNumber);
    const data = await fetchForm(rollNumber);
    setFormResponse(data);
  };

  if (!rollNumber || !formResponse) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <DynamicForm formResponse={formResponse} />
    </div>
  );
}

export default App;
