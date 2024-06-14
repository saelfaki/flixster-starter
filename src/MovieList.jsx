import MovieCard from './MovieCard';
import './MovieList.css';


function MovieList(props){
    function createCards(movie, index){

        return (

            <MovieCard
                key={index}
                title={movie.title}
                image={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                rating={movie.vote_average}
                favoritedMovies={()=> props.favorited(movie.id)}
                watchedMovies={()=> props.watched(movie.id)}
                toOpenModal={() => props.displayModal(movie.id)}
                />


        );
    }


    return (
        <div className='movieList'>
            {props.movieData.map(createCards)}
        </div>
    );

}


export default MovieList;
