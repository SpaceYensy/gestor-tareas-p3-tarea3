const express = require('express');
const router = express.Router();
const db = require('../data/db');
const { validateTask } = require('./validators');
const { formatDate } = require('./dateUtils');

// READ - listar todas las tareas
router.get('/', (req, res) => {
  const tasks = db.getAllTasks().map(t => ({
    ...t,
    dueDateFormatted: formatDate(t.dueDate)
  }));
  res.render('index', { tasks });
});

// CREATE - formulario nueva tarea
router.get('/new', (req, res) => {
  res.render('form', { task: null, errors: [] });
});

router.post('/', (req, res) => {
  const errors = validateTask(req.body);
  if (errors.length > 0) {
    return res.render('form', { task: req.body, errors });
  }
  db.createTask(req.body);
  res.redirect('/tasks');
});

// UPDATE - formulario de edición
router.get('/:id/edit', (req, res) => {
  const task = db.getTaskById(req.params.id);
  if (!task) return res.redirect('/tasks');
  res.render('form', { task, errors: [] });
});

router.put('/:id', (req, res) => {
  const errors = validateTask(req.body);
  if (errors.length > 0) {
    return res.render('form', { task: { ...req.body, id: req.params.id }, errors });
  }
  db.updateTask(req.params.id, req.body);
  res.redirect('/tasks');
});

// DELETE
router.delete('/:id', (req, res) => {
  db.deleteTask(req.params.id);
  res.redirect('/tasks');
});

module.exports = router;
