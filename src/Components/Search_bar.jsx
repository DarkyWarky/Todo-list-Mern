import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <div className="flex justify-around bg-red-400 p-3">
      <div className="relative w-1/2">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSearch} className="text-zinc-500 mr-2 absolute right-4 scale-150" />
          <input
            className="h-full p-3 rounded-3xl w-full border-zinc-500 border-4 text-xl"
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
