import React from 'react';
import { useState } from 'react';


const Search = (props) => {
    const [input, setInput] = useState('');

    function handleChange(e) {
        setInput(e.target.value);
        if (e.target.value === '') {
            props.emptySearchBar();
        }
    }


  return (
    <div className="search-bar">
        <input type="text"  onChange={handleChange} value={input} placeholder="Search Movies. . . . " />
        <button onClick={() => props.search(input)}>Search</button>
    </div>
  );
}



export default Search;
