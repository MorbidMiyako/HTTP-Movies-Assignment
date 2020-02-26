import React from 'react';
import { Link, useHistory } from "react-router-dom";
import Axios from 'axios';

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  const history = useHistory()

  console.log("props inside MovieCard", props)
  const deleteMovie = () => {
    Axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(() => {
        props.setMovieList(props.movieList.filter(item => (id !== item.id)))
        history.push(`/`);
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}

      <button onClick={deleteMovie}> Delete Movie</button>

      <Link to={`/update-movie/${id}`}>
        <div className='save-button' >
          Edit
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
