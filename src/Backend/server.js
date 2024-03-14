const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const routes = require("./routes")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();
const PORT = 3001;

app.use(cookieParser())
app.use(cors({
  origin:['http://localhost:3000'],
  credentials:true
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
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
  description:String,
  email:String
});

const Todo = mongoose.model("Todo", todoSchema);

app.use(express.json());

app.post("/add", async (req, res) => {
  const { task,index,email } = req.body;
  const description=" "

  try {
    const newTodo = new Todo({ task,index,description,email});
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/adddescp", async (req, res) => {
  const {descp,index,email } = req.body;
  try {
    const newTodo = await Todo.findOneAndUpdate({index:index,email:email},{description:descp});
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/del", async (req, res) => {
  const { number,email } = req.body;
  try {
    await Todo.deleteOne({index:number,email:email})
    const todos = await Todo.find({email:email});
    res.json(todos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/todos", async (req, res) => {
  const {email}= req.body
  try {
    const todos = await Todo.find({email:email});
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/search", async (req,res)=>{
  const {content,email} = req.body
  const Regex = new RegExp(content, 'i');
  try{
    const todos= await Todo.find({task:{ $regex: Regex},email:email})
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
