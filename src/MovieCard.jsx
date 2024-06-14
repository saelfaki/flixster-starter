import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './MovieCard.css';


function MovieCard (props) {
    const [like, setLike] = useState(false);
    const [watched, setWatched] = useState(false);



    return (
        <div className='moviecard' onClick={props.toOpenModal}>
            <h1 className='movietitle'>{props.title}</h1>
            <img src={props.image} className='moviepic'/>
            <p>Rating: {props.rating}</p>
                <div className='favorite'>
                    <button  onClick={(e) =>{
                        e.stopPropagation();
                        props.favoritedMovies();
                        setLike(!like)
                    }}>
                    Favorite: {like ? '💗' : '🖤'}
                    </button>
                </div>

                <div className='watched'>
                    <button  onClick={(e) =>{
                        e.stopPropagation();
                        props.watchedMovies();
                        setWatched(!watched)
                    }}>
                    Watched: {watched ? '☑️' : '🔘'}
                    </button>
                </div>
        </div>
    );
}

MovieCard.propTypes = {
        title: PropTypes.string,
        image: PropTypes.string,
        rating: PropTypes.number,
};



export default MovieCard;
