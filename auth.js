const express = require('express');
const router = express.Router();

// GET /login - mostrar formulario
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST /login - login simulado (sin base de usuarios real)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', { error: 'Usuario y contraseña son obligatorios.' });
  }

  // Simulación simple: cualquier usuario/contraseña no vacíos es válido
  res.redirect('/dashboard');
});

module.exports = router;
