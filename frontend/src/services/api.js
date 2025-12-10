import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api/tasks`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTasks = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch tasks');
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/', taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create task');
  }
};

export const updateTask = async (id, updates) => {
  try {
    const response = await api.put(`/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update task');
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete task');
  }
};
