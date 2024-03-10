const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const routes = require("./routes")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3001;

app.use(cookieParser())
app.use(cors({
  origin:['http://localhost:3000'],
  credentials:true
}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Zwar:DarkyWarky@zwardb.1makfjy.mongodb.net/Todo-List", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to the database');
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});

const todoSchema = new mongoose.Schema({
  task: String,
  index: Number,
  description:String
});

const Todo = mongoose.model("Todo", todoSchema);

app.use(express.json());

app.post("/add", async (req, res) => {
  const { task,index } = req.body;
  const description=" "

  try {
    const newTodo = new Todo({ task,index,description});
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/adddescp", async (req, res) => {
  const {descp,index } = req.body;
  try {
    const newTodo = await Todo.findOneAndUpdate({index:index},{description:descp});
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/del", async (req, res) => {
  const { number } = req.body;
  try {
    await Todo.deleteOne({index:number})
    const todos = await Todo.find();
    res.json(todos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/search", async (req,res)=>{
  const {content} = req.body
  const Regex = new RegExp(content, 'i');
  try{
    const todos= await Todo.find({task:{ $regex: Regex}})
    res.json(todos)
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
})

app.use("/loginapi",routes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
