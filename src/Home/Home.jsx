import React, { useEffect, useState } from 'react';
import './Home.css';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import TaskModal from '../Popup/Popup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from './Sidebar/Sidebar';
import { fetchTasks, addTask as addTaskApi, deleteTask as deleteTaskApi, editTask as editTaskApi } from '../APIs/api';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false); // State to manage sidebar visibility
  const [showNames, setShowNames] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState({ today: [], week: [], monthYear: [] });
  const [taskCategory, setTaskCategory] = useState('');
  const [initialTask, setInitialTask] = useState(null); // State to store the task being edited

  const toggleNames = () => {
    setShowNames(!showNames);
  };

  const handleAddTask = (category) => {
    setTaskCategory(category);
    setShowModal(true);
    setInitialTask(null); // Clear initialTask for adding new task
  };

  const handleEditTask = (task) => {
    setInitialTask(task); // Set the task to be edited
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTaskCategory(''); // Reset taskCategory after closing modal
    setInitialTask(null); // Clear initialTask after closing modal
  };

  const addTask = (newTask) => {
    addTaskApi(newTask)
      .then((savedTask) => {
        const updatedTasks = { ...tasks, [savedTask.tag]: [...tasks[savedTask.tag], savedTask] };
        setTasks(updatedTasks);
        setShowModal(false);
        setTaskCategory(''); // Reset taskCategory after saving task
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const deleteTask = (taskId) => {
    deleteTaskApi(taskId)
      .then(() => {
        const updatedTasks = { ...tasks };
        Object.keys(updatedTasks).forEach((key) => {
          updatedTasks[key] = updatedTasks[key].filter((task) => task._id !== taskId);
        });
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const editTask = (updatedTask) => {
    editTaskApi(updatedTask)
      .then((savedTask) => {
        // Update the tasks state correctly
        const updatedTasks = {
          ...tasks,
          [savedTask.tag]: tasks[savedTask.tag].map((task) =>
            task._id === savedTask._id ? savedTask : task
          ),
        };
        setTasks(updatedTasks);
        setShowModal(false);
        setTaskCategory(''); // Reset taskCategory after editing task
        setInitialTask(null); // Clear initialTask after editing task
      })
      .catch((error) => console.error('Error editing task:', error));
  };

  useEffect(() => {
    fetchTasks()
      .then((tasks) => {
        // Initialize with empty arrays for today, week, and monthYear
        const initialTasks = {
          today: [],
          week: [],
          monthYear: [],
        };

        // Group tasks by tag
        const groupedTasks = tasks.reduce((acc, task) => {
          if (task.tag === 'today' || task.tag === 'week' || task.tag === 'monthYear') {
            acc[task.tag] = acc[task.tag] ? [...acc[task.tag], task] : [task];
          }
          return acc;
        }, initialTasks);

        setTasks(groupedTasks);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="home">
      <Sidebar showNames={showNames} toggleNames={toggleNames} showSidebar={showSidebar} />
      <div className="main">
        <div className="title-bar">
          <h2>Task-2Do</h2>
          <div className="user-panel">
            <SettingsIcon className="user-icon" onClick={toggleSidebar} />
            <LogoutIcon className="user-icon" to="/login" />
          </div>
        </div>
        <div className="task-columns">
          <TaskColumn
            title="Today"
            tasks={tasks.today}
            handleAddTask={() => handleAddTask('today')}
            handleEditTask={handleEditTask}
            deleteTask={deleteTask}
          />
          <TaskColumn
            title="This Week"
            tasks={tasks.week}
            handleAddTask={() => handleAddTask('week')}
            handleEditTask={handleEditTask}
            deleteTask={deleteTask}
          />
          <TaskColumn
            title="This Month and This Year"
            tasks={tasks.monthYear}
            handleAddTask={() => handleAddTask('monthYear')}
            handleEditTask={handleEditTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
      {showModal && <TaskModal onClose={closeModal} onSave={initialTask ? editTask : addTask} category={taskCategory} initialTask={initialTask} />}
    </div>
  );
};

const TaskColumn = ({ title, tasks, handleAddTask, handleEditTask, deleteTask }) => {
  return (
    <div className="task-column">
      <h3>{title}</h3>
      <button className="add-task-button" onClick={handleAddTask}>
        <AddIcon />
      </button>
      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={() => handleEditTask(task)}>
              <EditIcon />
            </button>
            <button onClick={() => deleteTask(task._id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
