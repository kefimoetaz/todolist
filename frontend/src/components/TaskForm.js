import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onCreateTask }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Please enter a task description');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onCreateTask({
        description,
        category,
        priority,
        dueDate: dueDate || null
      });
      setDescription('');
      setCategory('other');
      setPriority('medium');
      setDueDate('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError('');
          }}
          disabled={loading}
        />
      </div>
      
      <div className="form-options">
        <select 
          className="task-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          <option value="other">📋 Other</option>
          <option value="work">💼 Work</option>
          <option value="personal">👤 Personal</option>
          <option value="shopping">🛒 Shopping</option>
        </select>

        <select 
          className="task-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={loading}
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        <input
          type="date"
          className="task-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={loading}
        />

        <button 
          type="submit" 
          className="add-button"
          disabled={loading}
        >
          {loading ? 'Adding...' : '+ Add Task'}
        </button>
      </div>
      
      {error && <div className="form-error">{error}</div>}
    </form>
  );
}

export default TaskForm;
