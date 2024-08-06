const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  user: 'todo',
  host: '0.0.0.0',
  database: 'app_todo',
  password: 'todo',
  port: 5432,
});

// Middleware
app.use(bodyParser.json());

// Create a new task
app.post('/todos', async (req, res) => {

  console.log("Create a new task");

  const { title, status } = req.body;
  try {
    const newTask = await pool.query(
      'INSERT INTO todos (title, status) VALUES ($1, $2) RETURNING *',
      [title, status]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
app.get('/todos', async (req, res) => {

  console.log("Get all tasks");

  try {
    const tasks = await pool.query('SELECT * FROM todos');
    res.status(200).json(tasks.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single task by ID
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    if (task.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(task.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    const updatedTask = await pool.query(
      'UPDATE todos SET title = $1, status = $2 WHERE id = $3 RETURNING *',
      [title, status, id]
    );
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(updatedTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(deletedTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
