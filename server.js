import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API = 'http://localhost:4000'; // API BASE URL

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Get all todos
app.get('/', async (req, res) => {
  try {
    const result = await axios.get(`${API}/todos`);
    res.render('index.ejs', { todos: result.data });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Get specific todo
app.get('/edit/:id', async (req, res) => {
  try {
    const result = await axios.get(`${API}/todos/${req.params.id}`);
    console.log(result.data);
    res.render('modify.ejs', {
      todo: result.data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

// Create new todo
app.post('/api/todos', async (req, res) => {
  try {
    const result = await axios.post(`${API}/todos`, req.body);
    console.log(result.data);
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

// Update a todo
app.post('/api/todos/:id', async (req, res) => {
  try {
    const result = await axios.patch(`${API}/todos/${req.params.id}`, req.body);
    console.log(result.data);
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

// Update a todo status
app.get('/api/todos/status/:id', async (req, res) => {
  try {
    const result = await axios.get(`${API}/todos/status/${req.params.id}`);
    console.log(result.data);
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

// Delete a specific todo
app.get('/api/todos/delete/:id', async (req, res) => {
  try {
    await axios.delete(`${API}/todos/${req.params.id}`);
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

// Delete all todos
app.delete('/api/todos/delete/all', async (req, res) => {
  try {
    await axios.delete(`${API}/all`);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing todos' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
