import axios from 'axios';

const BASE_URL = "https://dynamic-form-generator-9rl7.onrender.com";

export const createUser = async (rollNumber, name) => {
  const response = await axios.post(`${BASE_URL}/create-user`, {
    rollNumber,
    name,
  });
  return response.data;
};

export const fetchForm = async (rollNumber) => {
  const response = await axios.get(`${BASE_URL}/get-form`, {
    params: { rollNumber },
  });
  return response.data;
};
