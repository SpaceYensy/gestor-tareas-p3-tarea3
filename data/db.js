const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function getAllTasks() {
  return readDB().tasks;
}

function getTaskById(id) {
  return readDB().tasks.find(t => t.id === Number(id));
}

function createTask(task) {
  const db = readDB();
  const newId = db.tasks.length > 0 ? Math.max(...db.tasks.map(t => t.id)) + 1 : 1;
  const newTask = { id: newId, ...task };
  db.tasks.push(newTask);
  writeDB(db);
  return newTask;
}

function updateTask(id, updates) {
  const db = readDB();
  const index = db.tasks.findIndex(t => t.id === Number(id));
  if (index === -1) return null;
  db.tasks[index] = { ...db.tasks[index], ...updates };
  writeDB(db);
  return db.tasks[index];
}

function deleteTask(id) {
  const db = readDB();
  const filtered = db.tasks.filter(t => t.id !== Number(id));
  const deleted = db.tasks.length !== filtered.length;
  db.tasks = filtered;
  writeDB(db);
  return deleted;
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
