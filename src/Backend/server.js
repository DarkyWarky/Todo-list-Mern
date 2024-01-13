
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT =  3000;

app.use(cors());

mongoose.connect('my connection string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  task: String,
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(express.json());

app.post('/todos', async (req, res) => {
  const { task } = req.body;

  try {
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
