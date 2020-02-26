import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateForm = props => {
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();
  const history = useHistory()

  initialItem.stars = props.stars

  useEffect(() => {
    console.log("props in useEffect", props)
    const itemToUpdate = props.movies.find(thing => `${thing.id}` === id);


    if (itemToUpdate) {
      setItem(itemToUpdate);
    }
  }, [props.movies, id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    console.log(props)
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
        // res.data is the FULL array with the updated item
        // That's not always the case. Sometimes you need to build your
        // own updated array
        axios
          .get(`http://localhost:5000/api/movies`)
          .then(res => {
            console.log("res of put", res)
            props.setMovieList(res.data);
          })
        history.push(`/`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <div className="baseline" />

        <input
          type="string"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="string"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
