import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, setMovieList }) {
  console.log(movies, "movies")
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} movieList={movies} setMovieList={setMovieList} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
