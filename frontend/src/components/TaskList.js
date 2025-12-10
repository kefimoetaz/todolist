import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TaskStats from './TaskStats';
import TaskFilters from './TaskFilters';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      setError('');
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      setError('');
      const updatedTask = await updateTask(id, updates);
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setError('');
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const getFilteredAndSortedTasks = () => {
    let filtered = [...tasks];

    // Apply filter
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <div className="task-list">
      <TaskForm onCreateTask={handleCreateTask} />
      
      {error && <div className="error-message">{error}</div>}
      
      {tasks.length > 0 && (
        <>
          <TaskStats tasks={tasks} />
          <TaskFilters 
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </>
      )}
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Add one above to get started!</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks match the current filter.</p>
        </div>
      ) : (
        <div className="tasks">
          {filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
