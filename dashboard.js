const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/dashboard', (req, res) => {
  const tasks = db.getAllTasks();
  const stats = {
    total: tasks.length,
    pendientes: tasks.filter(t => t.status === 'pendiente').length,
    completadas: tasks.filter(t => t.status === 'completada').length
  };
  res.render('dashboard', { stats });
});

module.exports = router;
