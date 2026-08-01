const express = require('express');
const router = express.Router();
const db = require('../data/db');
const { validateTask } = require('./validators');

// GET /api/tasks - listar
router.get('/tasks', (req, res) => {
  res.json(db.getAllTasks());
});

// GET /api/tasks/:id - obtener una
router.get('/tasks/:id', (req, res) => {
  const task = db.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
});

// POST /api/tasks - crear
router.post('/tasks', (req, res) => {
  const errors = validateTask(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });
  const task = db.createTask(req.body);
  res.status(201).json(task);
});

// PUT /api/tasks/:id - actualizar
router.put('/tasks/:id', (req, res) => {
  const errors = validateTask(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });
  const updated = db.updateTask(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(updated);
});

// DELETE /api/tasks/:id - eliminar
router.delete('/tasks/:id', (req, res) => {
  const deleted = db.deleteTask(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.status(204).send();
});

module.exports = router;
