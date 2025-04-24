const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const suggestCategory = require('../utils/categorySuggester');

// ✅ Create a new task (with smart category)
router.post('/', async (req, res) => {
  const { title, priority, category } = req.body;
  const smartCategory = category && category.trim() !== '' ? category : 
suggestCategory(title);

  try {
    const task = new Task({ title, priority, category: smartCategory });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a task (complete / edit)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, 
{ new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

