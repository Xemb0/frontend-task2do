// src/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import TaskIcon from '@mui/icons-material/Assignment';
import PlanningIcon from '@mui/icons-material/CalendarToday';
import GlobalIcon from '@mui/icons-material/Language';
import AnalyticsIcon from '@mui/icons-material/Assessment';
import FinanceIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import TaskModal from './TaskModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from './Sidebar';
import { fetchTasks, addTask as addTaskApi, deleteTask as deleteTaskApi, editTask as editTaskApi } from './APIs/api';

const Home = () => {
  const [showNames, setShowNames] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState({ today: [], week: [], monthYear: [] });
  const [taskCategory, setTaskCategory] = useState('');

  const toggleNames = () => {
    setShowNames(!showNames);
  };

  const handleAddTask = (category) => {
    setTaskCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addTask = (newTask) => {
    addTaskApi(newTask)
      .then((response) => {
        const savedTask = response.data;
        setTasks((prevTasks) => ({
          ...prevTasks,
          [taskCategory]: [...prevTasks[taskCategory], savedTask],
        }));
        setShowModal(false);
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const deleteTask = (category, taskId) => {
    deleteTaskApi(taskId)
      .then(() => {
        const updatedTasks = tasks[category].filter((task) => task.id !== taskId);
        setTasks((prevTasks) => ({
          ...prevTasks,
          [category]: updatedTasks,
        }));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const editTask = (category, updatedTask) => {
    editTaskApi(updatedTask)
      .then((response) => {
        const updatedTasks = tasks[category].map((task) =>
          task.id === updatedTask.id ? response.data : task
        );
        setTasks((prevTasks) => ({
          ...prevTasks,
          [category]: updatedTasks,
        }));
      })
      .catch((error) => console.error('Error editing task:', error));
  };

  useEffect(() => {
    fetchTasks()
      .then((response) => {
        const tasks = response.data;
        const today = tasks.filter((task) => isToday(task.dueDate));
        const week = tasks.filter((task) => isThisWeek(task.dueDate));
        const monthYear = tasks.filter((task) => isThisMonthOrYear(task.dueDate));
        setTasks({ today, week, monthYear });
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const isToday = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
    return taskDate.toDateString() === today.toDateString();
  };

  const isThisWeek = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  };

  const isThisMonthOrYear = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
    return (
      (taskDate.getMonth() === today.getMonth() && taskDate.getFullYear() === today.getFullYear()) ||
      taskDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="home">
      <Sidebar showNames={showNames} toggleNames={toggleNames} />
      <div className="main">
        <div className="title-bar">
          <h2>Task-2Do</h2>
          <div className="user-panel">
            <SettingsIcon className="user-icon" />
            <LogoutIcon className="user-icon" to="/login" />
          </div>
        </div>
        <div className="task-columns">
          <TaskColumn
            title="Today"
            tasks={tasks.today}
            handleAddTask={handleAddTask}
            taskCategory="today"
            editTask={editTask}
            deleteTask={deleteTask}
          />
          <TaskColumn
            title="This Week"
            tasks={tasks.week}
            handleAddTask={handleAddTask}
            taskCategory="week"
            editTask={editTask}
            deleteTask={deleteTask}
          />
          <TaskColumn
            title="This Month and This Year"
            tasks={tasks.monthYear}
            handleAddTask={handleAddTask}
            taskCategory="monthYear"
            editTask={editTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
      {showModal && <TaskModal onClose={closeModal} onSave={addTask} />}
    </div>
  );
};

const TaskColumn = ({ title, tasks, handleAddTask, taskCategory, editTask, deleteTask }) => {
  return (
    <div className={`task-column ${taskCategory}`}>
      <h3>{title}</h3>
      <button className="add-task-button" onClick={() => handleAddTask(taskCategory)}>
        <AddIcon />
      </button>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={() => editTask(taskCategory, task)}>
              <EditIcon />
            </button>
            <button onClick={() => deleteTask(taskCategory, task.id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
