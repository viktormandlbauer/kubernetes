const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { Pool } = require('pg');
const winston = require('winston');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 
// Logging
//
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    winston.format.printf(({ timestamp, level, message, meta }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // Add more transports here (e.g., file, HTTP) if needed
  ],
});

//
// Environment variables
//
const DB_NAME = process.env.DB_NAME || 'app_todo';
const DB_USER = process.env.DB_USER || 'todos';
const DB_HOST = process.env.DB_HOST || '0.0.0.0';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_PASSWORD = process.env.DB_PASSWORD || '';

// PostgreSQL connection
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Middleware
app.use(bodyParser.json());

// Create a new task
app.post('/todos', async (req, res) => {
  
  const { title, status } = req.body;

  if(title.length > 140) {
    logger.error('Todo must be less than 120 characters: ' + title);
    return res.status(400).json({ error: 'Todo must be less than 120 characters' });
  }
  
  try {
    const newTask = await pool.query(
      'INSERT INTO todos (title, status) VALUES ($1, $2) RETURNING *',
      [title, status]
    );
    logger.info('New todo created: ' + title);
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    logger.error('Error creating new todo: ' + title);
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
app.get('/todos', async (req, res) => {
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
