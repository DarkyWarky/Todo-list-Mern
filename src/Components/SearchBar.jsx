import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const SearchBar = ({onSearch}) => {
  const[content,setContent] = useState("")
  const handleClick=()=>{
    console.log("clicked")
    onSearch(content)
  }
  return (
    <div className="flex justify-around bg-gray-700 p-3">
      <div className="relative w-1/2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSearch} className="text-zinc-500 mr-2 absolute right-4 scale-150" onClick={handleClick}/>
          <input
            className="h-full p-3 rounded-3xl w-full border-zinc-500 border-4 text-xl"
            placeholder="Search..."
            type="text"
            onChange={(e)=>{setContent(e.target.value)}}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
