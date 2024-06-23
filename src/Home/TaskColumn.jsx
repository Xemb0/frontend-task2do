import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskModal from './TaskModal';

const TaskColumn = ({ title, tasks, handleAddTask, handleEditTask, handleDeleteTask, showModal, closeModal }) => (
  <div className="task-column">
    <h3>{title}</h3>
    <button className="add-task-button" onClick={handleAddTask}>
      <AddIcon />
    </button>
    {tasks.map(task => (
      <div className="task" key={task.id}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <button onClick={() => handleEditTask(task)}><EditIcon /></button>
        <button onClick={() => handleDeleteTask(task.id)}><DeleteIcon /></button>
      </div>
    ))}
    {showModal && <TaskModal onClose={closeModal} />}
  </div>
);

export default TaskColumn;
