import { useEffect, useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Search from './Search'
import MovieModal from './MovieModal';
import Sidebar from './Sidebar';


const App = () => {
 const [movies, setMovies] = useState([]);
 const [pageNumber, setPageNumber] = useState(1);
 const [input, setInput] = useState('');
 const [OpenSearch, setOpenSearch] = useState(false);
 const [nowPlaying, setnowPlaying] = useState(true);
 const [selectedMovieID, setSelectedMovieID] = useState(null);
 const [showModal, setShowModal] = useState(false);
 const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`);
 const [isOpen, setIsOpen] = useState(false);
 const [filterOption, setFilterOption] = useState('genre');
 const [favoritedMovies, setFavoritedMovies] = useState([]);
 const [watchedMovies, setWatchedMovies] = useState([]);


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


 const handleFavoritedMovies = (movie) => {
   if (favoritedMovies.includes(movie)) {
     setFavoritedMovies(favoritedMovies => favoritedMovies.filter((favMovie) => favMovie !== movie));
   } else {
     setFavoritedMovies(favoritedMovies => [...favoritedMovies, movie]);
   }
 };


 const handleWatchedMovies = (movie) => {
   if (watchedMovies.includes(movie)) {
     setWatchedMovies(watchedMovies => watchedMovies.filter((favMovie) => favMovie !== movie));
    } else {
     setWatchedMovies(watchedMovies => [...watchedMovies, movie]);
    }
 };




 useEffect(() => {
   if (filterOption === 'comedy') {
     setUrl(`https://api.themoviedb.org/3/discover/movie?api_key=<2f8cd4ccd07611c213b7f4f3511f83fd>&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=35&page=${pageNumber}`);
   } else if (filterOption === 'action') {
     setUrl(`https://api.themoviedb.org/3/discover/movie?api_key=<2f8cd4ccd07611c213b7f4f3511f83fd>&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=28&page=${pageNumber}`);
   } else if (filterOption === 'fantasy') {
     setUrl(`https://api.themoviedb.org/3/discover/movie?api_key=<2f8cd4ccd07611c213b7f4f3511f83fd>&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=14&page=${pageNumber}`);
   } else {
     setUrl(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`);
   }
 }, [filterOption, pageNumber]);






 const handleFilterChange = (event) => {
   setFilterOption(event.target.value);


   let filteredMovies;
   if (event.target.value === 'releaseDate') {
     filteredMovies = [...movies].sort((a, b) => (new Date(b.release_date)) - (new Date(a.release_date)))
   } else if (event.target.value === 'rating') {
     filteredMovies =  [...movies].sort((a, b) => (b.vote_average - a.vote_average))
   } else {
     filteredMovies = [...movies]
   };


   setMovies(filteredMovies);
 };






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




 function loadButton() {
   setPageNumber(lastPage => lastPage + 1);
   setUrl(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber+1}`);
 }


 const openModal = (id) => {
   setShowModal(true);
   setSelectedMovieID(id);
 };




 const closeModal = () => {
   setShowModal(false);
 };


 const toggleSidebar = () => {
   setIsOpen(!isOpen);
 };








return(


   <div className="App">
   <header className="App-header">
     <h1>Flixster</h1>
       <div>
         <select value={filterOption} onChange={handleFilterChange}>
           <option value="">Sort</option>
           <option value="">All</option>
           <option value="comedy">Comedy</option>
           <option value="action">Action</option>
           <option value="fantasy">Fantasy</option>
           <option value="releaseDate">Release Date</option>
           <option value="rating">Rating</option>
         </select>
       </div>
       <div className="nowplayingButton">
        <button onClick={handlenowPlaying}>Now Playing</button>
       </div>
       <div className='searchButton'>
         <button onClick={handleSearchPage}>Search</button>
       </div>
       <div className='sidebarButton'>
         <button onClick={toggleSidebar}>Favorited and Watched Movies</button>
       </div>
   </header>
   <main>
   <Sidebar isOpen={isOpen} toggle={toggleSidebar} movieData={movies} favorited={favoritedMovies} watched={watchedMovies} />


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
