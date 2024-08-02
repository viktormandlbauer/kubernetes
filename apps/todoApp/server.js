const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const imageService = require('./services/fileService');

setInterval(() => {
  // Fetch and save a file
  imageService.fetchFile('https://picsum.photos/1200')
    .then((filePath) => {
      console.log('File saved at:', filePath);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, 3600000);

const app = express();
const PORT = process.env.PORT || 3000;


// PostgreSQL connection
const pool = new Pool({
  user: 'todo',
  host: '0.0.0.0',
  database: 'todo_app',
  password: 'todo',
  port: 5432,
});

// Middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'))

// Define a route to return an HTML site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create a new task
app.post('/tasks', async (req, res) => {
  // Print something
  const { title, status } = req.body;
  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *',
      [title, status]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await pool.query('SELECT * FROM tasks');
    res.status(200).json(tasks.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single task by ID
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (task.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *',
      [title, status, id]
    );
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updatedTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
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
