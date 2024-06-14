import React from 'react';
import './Sidebar.css';
import SidebarCards from './SidebarCards'

const Sidebar = (props ) => {
  function createSidebarCards(movieId, index){

    const favoriteMovie = props.movieData.find((movie) => movie.id === movieId)

    return (
        <SidebarCards
            key={index}
            title={favoriteMovie.original_title}
            image={"https://image.tmdb.org/t/p/w500/" + favoriteMovie.poster_path}
        />
    )
  }


  return (
    <nav className={props.isOpen ? 'sidebar open' : 'sidebar'}>
      <ul>
        <li>Favorite Movies</li>
        <div className="sidebar-cards">
          {props.favorited.map(createSidebarCards)}
        </div>
        <li>Watched List</li>
          {props.watched.map(createSidebarCards)}
      </ul>

      <button onClick={props.toggle}>Close</button>

    </nav>
  );
};

export default Sidebar;
