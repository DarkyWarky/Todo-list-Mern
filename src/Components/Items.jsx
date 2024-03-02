import React, { useState, useRef } from "react";
import axios from "axios";

const Items = ({ task, onDelete,index,descp }) => {
  const [expanded, setExpanded] = useState(true);
  const [expandText, setExpandText] = useState("Expand...");
  const textareaRef = useRef(null);


  const updateDescp = (e) => {
    const data=e.target.value
    axios
      .post("http://localhost:3001/adddescp", { descp:data,index: index })
      .catch((error) => console.error(error));
  };
  const toggleExpansion = () => {
    const textareaHeight = textareaRef.current.scrollHeight;
    const numberOfRows = Math.ceil(textareaHeight / 26);

    setExpanded(!expanded);
    setExpandText(expanded ? "Expand..." : "Minimize");
    textareaRef.current.rows = !expanded ? numberOfRows.toString() :"3";
  };

  return (
    <div className="bg-gray-100 p-4 h-32 ml-10 mr-10 rounded-3xl flex justify-between items-center min-h-0 lg:h-full sm:h-3/4 md:h-3/4 shadow-lg shadow-slate-400 text-wrap">
      <div className="flex-grow">
        <h1 className="textbox font-bold text-2xl text-wrap">{task}</h1>
        <textarea
          ref={textareaRef}
          rows="3"
          className="w-5/6 p-2 border resize-none"
          style={{ overflow: "hidden" }}
          onInput={updateDescp}
          suppressContentEditableWarning={true}
        >
          {descp}
        </textarea>
        <br />
        <button onClick={toggleExpansion} className="p-2 text-purple-700">
          {expandText}
        </button>
      </div>
      <button className="delete bg-cyan-300 p-3 rounded-3xl" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Items;
