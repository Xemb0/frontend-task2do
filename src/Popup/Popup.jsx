// TaskModal.js

import React, { useEffect, useState } from 'react';
import './Popup.css';

const TaskModal = ({ onClose, onSave, category, initialTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tag, setTag] = useState(category); // Initialize tag with the current category

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setDueDate(initialTask.dueDate);
      setTag(initialTask.tag);
    } else {
      setTag(category);
    }
  }, [initialTask, category]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskData = {
      _id: initialTask ? initialTask._id : undefined, // Provide _id for editing
      title,
      description,
      dueDate: new Date(dueDate),
      tag,
    };

    onSave(taskData);
    onClose(); // Close the modal after saving or editing the task
  };

  return (
    <div className="task-modal">
      <div className="modal-content">
        <h2>{initialTask ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </label>
          <label>
            Due Date:
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
          <label>
            Tag:
            <input type="text" value={tag} readOnly />
          </label>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">{initialTask ? 'Save Changes' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
