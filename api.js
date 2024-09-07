import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

// All todos
let todos = [
  {
    id: 1,
    todoText: 'Buy a milk',
    todoCreatedAt: new Date(),
    todoStatus: false,
  },
];
let lastId = todos.length; // Get the length of todo list

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get a specific todo
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (!todo) return res.statusCode(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// Post a new todo
app.post('/todos', (req, res) => {
  const newId = (lastId += 1);
  const newTodo = {
    id: newId,
    todoText: req.body.todoText,
    todoCreatedAt: new Date(),
    todoStatus: false,
  };
  lastId = newId;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Patch a specific todo
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  
  if (!todo) res.status(404).json({ message: 'Todo not found' });
  if (req.body.todoText) todo.todoText = req.body.todoText;

  res.json(todo);
});

// Update todo status
app.get('/todos/status/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  
  if (!todo) res.status(404).json({ message: 'Todo not found' });
  todo.todoStatus = true;

  res.json(todo);
});

// Delete a specific todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const searchTodo = todos.find(todo => todo.id === id);
  if (!searchTodo) {
    res.status(404).json({ message: 'Todo not found' });
  } else {
    const searchTodoIndex = todos.findIndex(todo => todo.id === id);
    todos.splice(searchTodoIndex, 1);
    res.json({ message: 'Todo deleted' });
  }
});

// Delete all todos
app.delete('/all', (req, res) => {
  todos = [];
  res.json({ message: 'Todos deleted' });
});

app.listen(port, () => {
  console.log(`Server running on por ${port}`);
});
