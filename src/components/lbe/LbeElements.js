import React from "react";
import {Link} from "react-router-dom";

import useBaseUrl from '@docusaurus/useBaseUrl';


// Import global data

import { lbeTable, filterAttr } from "./Data.js";


// Button for Repo Links

function RepoButton( {name,url} ) {
    return (
      <button className="lbe__block__link">
        <a href={url} target="_blank">{name}</a>
      </button>
    )
}


// Handles text input

function TextSearch( { lbeState, setLbeState, resultOutput } ) {

    const handleChange = e => setLbeState({search: e.target.value, subd: "", repo: "", journal: "", switch: "search"},[e.target.value]);
  
    return(
      <div className="lbe__searchfilter__search">
        <input className="navbar__search-input" placeholder="Type to search" value={lbeState.search} onChange={handleChange} /> &ensp; <em>{resultOutput}</em>
      </div>
    )
}

  
// Function for handling button clicks
  
function HandleClick( {name,newState,setLbeState} ) {
    if (name == "All") {
      setLbeState({journal: "All", subd: "All", repo: "All", switch: "subd"});
    } else {
      setLbeState(newState);
    }
}
  
  
// Function for filtering buttons
  
function FilterButton( {type, name, numbered, lbeState, setLbeState} ) { // type and name are strings, numbered is boolean
  
    // Initialize variables
  
    var buttonClass = "lbe__filterbutton";
    var number = 0;
    var label = "";
  
    // Define how the state object should be set when clicked
  
    var newState={[type]: name, switch: type};
    
    // Styling of active button
  
    if (name === lbeState[type]) {  
      buttonClass = "lbe__filterbutton lbe__filterbutton--active";
    }
  
    // Determine number (when needed)
  
    if (numbered) {
      if (name === "All") {
        number = lbeTable.length;
      } else {
        number = lbeTable.map(m => JSON.stringify(m[filterAttr[type]])).filter(m => m.includes(name)).length;
      }
      label = name + " (" + number + ")";  
    } else {
      label = name;
    }
  
    return (
      <button 
        className={buttonClass}
        onClick={() => HandleClick( {...{name,newState,setLbeState}} )} 
      >
        {label}
      </button>
    )
}

function LbeChip( {title} ) {
  return(
    <Link to={useBaseUrl("/docs/datasets/?subd="+title)}>
      <button className="lbe__filterbutton lbe__chip">
        Lead by Example 
        &#9654;<strong>{title}</strong>
      </button>
    </Link>
  )
}

export { RepoButton, TextSearch, FilterButton, LbeChip };