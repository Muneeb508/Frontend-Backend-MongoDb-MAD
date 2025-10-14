require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🧩 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err.message));

// 🧩 Todo Schema & Model
const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

// 🧩 Routes

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    if (!title) return res.status(400).json({ error: 'Task title is required' });

    const newTodo = await Todo.create({ 
      title, 
      description: description || undefined,
      priority: priority || 'medium'
    });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a todo (edit)
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle todo completion
app.patch('/api/todos/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: 'Todo not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('✅ Todo API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
