import { useState, useEffect } from "react";
import React from "react";
import Items from "./Items";
import SearchBar from "./SearchBar";
import axios from "axios";

const Lists = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskNo, setTaskNo] = useState(0)
  const [email,setEmail]= useState("")


  useEffect(() => {
    axios.defaults.withCredentials =true
         axios.get('http://localhost:3001/loginapi/verifyUser')
        .then((res)=>{
            if(res.data.valid ===true){
              setEmail(res.data.email)
              axios
              .post("http://localhost:3001/todos",{email:email})
              .then((response) => {
                setTasks(response.data)
              })
              .catch((error) => console.error(error));
            }
            else{
                
            }
        })
     
  }, [email]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      axios
      .post("http://localhost:3001/add", { task: newTask,index:taskNo,email:email })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
        setTaskNo(taskNo+1)
      })
      .catch((error) => console.error(error));
    }
  };

  const deleteTask = (index) => {
    axios
      .post("http://localhost:3001/del", {number : index,email:email })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error(error));
  };


  const search = (content)=>{
    axios
      .post("http://localhost:3001/search",{content :content,email:email})
      .then((response)=>{
        setTasks(response.data)
      })
      .catch((error)=>{
        console.error(error)
      })
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className=" bg-gray-700">
      <SearchBar onSearch={search}/>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter task"
        className="w-[50%] ml-[25%] h-20 text-2xl cursor-text p-3 border-4 border-neutral-400 rounded-3xl"
      />

      <button
        onClick={addTask}
        className=" text-6xl rounded-3xl font-bold h-full text-white"
      >+</button>

      <div className="bg-gray-700 flex justify-center min-h-screen">
        <div className=" grid auto-rows- grid-cols-1 p-4 m-10 items-center w-[50%] h-fit justify-evenly gap-4 max-w-5xl rounded-lg">
          {tasks.map((taskItem, index) => (
            <Items
              key={index}
              task={taskItem.task}
              onDelete={()=>deleteTask(taskItem.index)}
              index={index}
              descp={taskItem.description}
              email={email}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lists;
