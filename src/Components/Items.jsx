import React from "react";
import { useState } from "react";

const Items = ({ task, onDelete }) => {
  const [expanded, setExpanded] = useState(true);
  const [expandText, setexpandText] = useState("Expand...");

  const toggleExpansion = () => {
    setExpanded(!expanded);
    if (expanded) setexpandText("Minimize");
    else setexpandText("Expand...");
  };
  return (
    <div className="bg-gray-100 p-4 h-32 ml-10 mr-10 rounded-3xl flex justify-between items-center min-h-0 lg:h-full sm:h-3/4 md:h-3/4 shadow-lg shadow-slate-400 text-wrap">
      <div className="flex-grow">
        <h1 className="textbox font-bold text-2xl text-wrap">{task}</h1>
        <div
          className={`w-5/6 ${expanded ? "max-h-[118px]" : "max-h-full"} p-2 border`}
          style={{ overflow: "hidden" }}
          contentEditable={true}
        ></div>
        <button onClick={toggleExpansion} className="p-2 text-purple-700">{expandText}</button>
      </div>
      <button className="delete bg-cyan-300 p-3 rounded-3xl" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Items;
