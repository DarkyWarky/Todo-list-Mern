import { useState,useEffect } from "react";
import React from "react";
import Items from "./Items";
import Search_bar from "./Search_bar";
import axios from "axios";

const Lists = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "") {
      axios
        .post("http://localhost:3000/todos", { task: newTask })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask("");
        })
        .catch((error) => console.error(error));
    }
  };

  const handlekeypress =(event)=>{
    if (event.key === 'Enter'){
      addTask()
    }
  }

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  return (
    <div>
      <Search_bar/>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handlekeypress}
        placeholder="Enter task"
        className="w-[50%] ml-[25%] h-20 text-2xl cursor-text p-3 border-4 border-neutral-400 rounded-3xl"
      />

      <button onClick={addTask} className=' bg-red-500 p-3 text-3xl rounded-xl font-bold'>ADD</button>

      <div className="bg-green-200 flex justify-center h-screen">
        <div className="bg-blue-300 grid grid-rows-5 grid-cols-1 p-4 m-10 items-center w-[50%] h-auto justify-evenly">
          {tasks.map((taskItem, index) => (
            <Items
              key={index}
              task={taskItem.task}
              onDelete={() => deleteTask(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lists;
