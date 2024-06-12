import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Movie from "../interfaces/Movie";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);

  useEffect(() => {
    //Hämtar filmer från localstorage, tom sträng om ingen nyckel.
    const storedMovies = JSON.parse(localStorage.getItem("moviesList") || "[]");
    //Letar i storedMovies och returnerar första filmen med matchande movieID och sätter till Selected. LÄS
    const selectedMovie = storedMovies.find(
      (m: Movie) => m.id.toString() === movieId
    );
    //uppdaterar state
    setMovie(selectedMovie);
    //beroenden för useEffect, dvs. körs när movieId ändras.
  }, [movieId]);

  const navigate = useNavigate();

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
      <h1>{movie.name}</h1>;
      <img src={movie.image} alt={movie.name} />
      <p>{movie.description}</p>
      <button
        onClick={() => {
          navigate("/" + movie.id);
        }}
      >
        Buy now {movie.price}
      </button>
    </div>
  );
};

export default MovieDetails;
