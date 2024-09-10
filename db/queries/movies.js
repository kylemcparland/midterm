const { query } = require('express');
const db = require('../connection');

const getAllMovies = (options) => {
  // Pull title from search query...
  const { title, sort } = options || {};
  const queryParams = [];

  // Initialize query...
  let queryString = `
  SELECT movies.id AS movie_id, movies.title, movies.year, movies.price, movies.quality, movies.is_sold,
         genres.id AS genre_id, genres.name AS genre_name
  FROM movies
  JOIN genres ON movies.genre_id = genres.id
  WHERE 1=1 `;

  if (title) {
    // Use ILIKE for case-insensitive search
    queryParams.push(`%${title}%`);
    queryString += `AND (title ILIKE $${queryParams.length} OR genres.name ILIKE $${queryParams.length}) `;
  }

  if (options && options.sort) {
    if (options.sort === 'genre') {
      queryString += `ORDER BY genres.name `;
    } else if (options.sort === 'year') {
      queryString += `ORDER BY movies.year `;
    } else if (options.sort === 'priceHighToLow') {
      queryString += `ORDER BY movies.price DESC`
    } else if (options.sort === 'priceLowToHigh') {
      queryString += `ORDER BY movies.price`
    }
  }

  return db.query(queryString, queryParams)
    .then(data => {
      console.log(data.rows)
      console.log(queryString)
      return data.rows;
    });
};

module.exports = { getAllMovies };
