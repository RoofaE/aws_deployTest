const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage
let tasks = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a project', completed: false }
];

// Health check endpoint for AWS
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Routes
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});