const db = require('../connection');

const getAllMovies = () => {
  return db.query('SELECT * FROM movies;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllMovies };
