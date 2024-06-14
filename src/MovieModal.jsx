import React from 'react';
import './MovieModal.css';
import { useState } from 'react';

function MovieModal(props) {
    const [modalTrailerUrl, setModalTrailerUrl] = useState("");


    const Genres = {
        28:"Action",
        12:"Adventure",
        16:"Animation",
        35:"Comedy",
        80:"Crime",
        99:"Documentary",
        18:"Drama",
        10751:"Family",
        14:"Fantasy",
        36:"History",
        27:"Horror",
        10402:"Music",
        9648:"Mystery",
        10749:"Romance",
        878:"Science Fiction",
        10770:"TV Movie",
        53:"Thriller",
        10752:"War",
        37:"Western",
     }

    function mapGenres(genres){
        return genres.map(genre => Genres[genre]).join(", ")
    }

    const getModalVideo = async (movieId) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

        const modalTrailerUrl = await fetch(videosUrl)
          .then((response) => response.json())
          .then((response) =>
            response.results.find(
              (video) => video.site === "YouTube" && video.type === "Trailer"
            )
          )
          .then((trailer) => `https://www.youtube.com/embed/${trailer.key}`)
          .catch((error) => {
            console.error("Error fetching movie trailer:", error);
          } );


        setModalTrailerUrl(modalTrailerUrl);
    };

    useState(() => {
        getModalVideo(props.id);
    }, [props.data]);






    return(
        <div id='movie-modal' className='modal-overlay'>
            {props.data.filter(movie => movie.id === props.id)
            .map(movie => {
                return(
                    <div key={movie.id} className='modal-content'>
                        <h2>{movie.title}</h2>
                        <img className='modal-image' src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}/>
                        <p>Release Date: <span>{movie.release_date}</span></p>
                        <p>Overview: <span>{movie.overview}</span></p>
                        <p>Genres: {mapGenres(movie.genre_ids)}</p>
                        <iframe
                            src={modalTrailerUrl}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Movie Trailer"
                            className="modal-trailer"
                        ></iframe>
                        <button className='close-button' onClick={props.closeModal}>X</button>
                    </div>
                    )
                }
                )
            }
        </div>
    )
}


export default MovieModal;
