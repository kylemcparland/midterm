const { query } = require('express');
const db = require('../connection');

const getAllMovies = (options) => {
  // Pull title from search query...
  const { title } = options || {};
  const queryParams = [];

  // Initialize query...
  let queryString = `
  SELECT movies.id AS movie_id, movies.title, movies.year, movies.price, movies.quality, movies.is_sold,
         genres.id AS genre_id, genres.name AS genre_name 
  FROM movies
  JOIN genres ON movies.genre_id = genres.id
  WHERE 1=1 `;

  // If user searched for a title, add it to the query...
  if (title) {
    queryParams.push(`%${title}%`);
    queryString += `AND title LIKE $${queryParams.length} `;
  }

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllMovies };
