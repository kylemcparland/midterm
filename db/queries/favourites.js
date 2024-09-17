const db = require('../connection');

const getFavourites = (userId) => {
    let queryString = `
    SELECT *
    FROM movies
    LEFT JOIN favourites ON favourites.movie_id = movies.id
    LEFT JOIN users ON favourites.user_id = users.id
    WHERE favourites.user_id = ${userId}
  `
  if (userId) {
    return db.query(queryString)
    .then(data => {
      return data.rows;
  });
  } else {
    return []; // No user, no favourites
  }
}

module.exports = { getFavourites };