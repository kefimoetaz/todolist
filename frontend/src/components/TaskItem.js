import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleToggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDescription(task.description);
  };

  const handleSave = () => {
    if (editedDescription.trim()) {
      onUpdate(task._id, { description: editedDescription });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDescription(task.description);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      work: '💼',
      personal: '👤',
      shopping: '🛒',
      other: '📋'
    };
    return icons[category] || icons.other;
  };

  const formatDueDate = (date) => {
    if (!date) return null;
    const dueDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const isOverdue = due < today && !task.completed;
    const dateStr = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return { dateStr, isOverdue };
  };

  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
      
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            className="edit-input"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-content">
            <div className="task-description">{task.description}</div>
            <div className="task-meta">
              <span className="task-badge category-badge">
                {getCategoryIcon(task.category)} {task.category}
              </span>
              <span className={`task-badge priority-badge ${task.priority}`}>
                {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {task.priority}
              </span>
              {dueDateInfo && (
                <span className={`due-date ${dueDateInfo.isOverdue ? 'overdue' : ''}`}>
                  📅 {dueDateInfo.dateStr} {dueDateInfo.isOverdue && '(Overdue)'}
                </span>
              )}
            </div>
          </div>
          <div className="task-actions">
            <button className="edit-btn" onClick={handleEdit}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
