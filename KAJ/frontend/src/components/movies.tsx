
import { useEffect, useState } from "react";
import Movie from "../interfaces/Movie";



function Movies() {


  
  const [movies, setMovies] = useState<Movie[]>([]);
  

  useEffect(() => {

      fetch('http://localhost:5000/movies')
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.movies);
          console.log(data.movies);
        });
    

  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <div className="movies">
          {movies.map((movie) => (
            <div key={movie.id} className="movie">
              <img src={movie.image} alt={movie.name} />
              <h2>{movie.name}</h2>
              
              <p>Director: {movie.director}</p>
              <p>Year: {movie.year}</p>
              <p>Price: {movie.price} €</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  
   
    


   
  );
}


export default Movies;
