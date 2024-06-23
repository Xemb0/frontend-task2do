import axios from 'axios';

const API_URL = 'https://backend-task2do-1.onrender.com';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    console.log("api",task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editTask = async (task) => {
  try {
    const response = await axios.put(`${API_URL}/${task.id}`, task);
    return response.data;
  } catch (error) {
    throw error;
  }
};
