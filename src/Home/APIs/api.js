// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchTasks = () => {
  return axios.get(`${API_URL}/tasks`);
};

export const addTask = (newTask) => {
  return axios.post(`${API_URL}/add`, newTask);
};

export const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/delete/${taskId}`);
};

export const editTask = (updatedTask) => {
  return axios.put(`${API_URL}/edit/${updatedTask.id}`, updatedTask);
};
