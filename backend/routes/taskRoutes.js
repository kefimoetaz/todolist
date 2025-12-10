const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { description, category, priority, dueDate } = req.body;
    
    if (!description || description.trim().length === 0) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const taskData = { description };
    if (category) taskData.category = category;
    if (priority) taskData.priority = priority;
    if (dueDate) taskData.dueDate = dueDate;

    const task = new Task(taskData);
    await task.save();
    
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// Update a task
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, completed, category, priority, dueDate } = req.body;
    
    const updateData = {};
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (category !== undefined) updateData.category = category;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;

    const task = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Task not found' });
    }
    next(error);
  }
});

// Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Task not found' });
    }
    next(error);
  }
});

module.exports = router;
