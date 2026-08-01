const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const tasksRouter = require('./routes/tasks');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/tasks'));
app.use('/tasks', tasksRouter);
app.use('/api', apiRouter);
app.use('/', authRouter);
app.use('/', dashboardRouter);

app.listen(PORT, () => {
  console.log(`TaskFlow corriendo en http://localhost:${PORT}`);
});
