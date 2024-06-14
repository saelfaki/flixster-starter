import React from 'react';
import './SidebarCards.css';


const SidebarCards = (props) => {



  return (
    <div className="sidebar-card">
        <img className='sidebar-moviepic' src={"https://image.tmdb.org/t/p/w500/" + props.image}/>
        <h1>{props.title}</h1>
    </div>
  );
};

export default SidebarCards;
