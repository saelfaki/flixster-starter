import { useEffect, useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Search from './Search'
import MovieModal from './MovieModal';




const App = () => {
  const[movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [input, setInput] = useState('');
  const [OpenSearch, setOpenSearch] = useState(false);
  const [nowPlaying, setnowPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`);






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

  function handleSearchPage(){
    setOpenSearch(true);
    setnowPlaying(false);
  }


  function handleSearchInput(userSearch){
    setMovies([]);
    setOpenSearch(true);
    setnowPlaying(false);
    setUrl(`https://api.themoviedb.org/3/search/movie?query=${userSearch}&include_adult=false&language=en-US&page=1`);
  }


  function emptySearchBar(){
    setMovies([]);
    setUrl(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`);
  }



  function handlenowPlaying(){
  setnowPlaying(true);
  setOpenSearch(false);
  setPageNumber(1);
  setUrl(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`);
  }

  const openModal = (id) => {
    setShowModal(true);
    setSelectedMovieID(id);
  };



  const closeModal = () => {
    setShowModal(false);
  };










return(

    <div className="App">
    <header className="App-header">
      <h1>Flixster</h1>
      <div className="nowplayingButton">
        <button onClick={handlenowPlaying}>Now Playing</button>
       </div>
       <div className='searchButton'>
         <button onClick={handleSearchPage}>Search</button>
       </div>

    </header>

    <main>



   {nowPlaying ?
   <>


     {showModal ? <MovieModal id={selectedMovieID} data={movies} closeModal={closeModal}/> : null}


     <MovieList displayModal={openModal} movieData={movies} favorited={handleFavoritedMovies} watched={handleWatchedMovies}/>
     <button className="loadmore"onClick={loadButton}>Load More</button>
   </> :
   <>




   <Search input={input} search={handleSearchInput} emptySearchBar={emptySearchBar}/>
   <MovieList movieData={movies} watched={handleWatchedMovies} favorited={handleFavoritedMovies}/>
   </>


   }



    </main>
    <footer className='footer'>
      <p>©️Movie Entertainment Services</p>
    </footer>
    </div>

    );

}


export default App;
