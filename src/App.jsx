import { useEffect, useState } from 'react'
import './App.css'
import MovieList from './MovieList'




const App = () => {
  const[movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);



  useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjhjZDRjY2QwNzYxMWMyMTNiN2Y0ZjM1MTFmODNmZCIsInN1YiI6IjY2Njc2MmE5Y2Y3NjZjZjY1NjE1ZDQ4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9ND8yeaBx28KSlGqWMoLlNeTSPLl5O04en5KKlmSSB8'
        }
    };

    if (pageNumber === 1) {
    fetch(url, options)
      .then(response => response.json())
      .then(response => setMovies([...response.results]))
      .catch(err => console.error(err));
    } else {
        fetch(url, options)
          .then(response => response.json())
          .then(response => setMovies(lastMovies => lastMovies.concat(response.results)))
          .catch(err => console.error(err));
    }
  }, [pageNumber, url]);

  function loadButton() {
    setPageNumber(lastPage => lastPage + 1);
    setUrl(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber+1}`);
  }





return(

    <div className="App">
    <header className="App-header">
      <h1>Flixster</h1>
    </header>
    <main>

    <MovieList displayModal={openModal} movieData={movies} favorited={handleFavoritedMovies} watched={handleWatchedMovies}/>
    <button className="loadmore"onClick={loadButton}>Load More</button>


    </main>
    <footer className='footer'>
      <p>©️Movie Entertainment Services</p>
    </footer>
    </div>

    );

}


export default App;
