const db = require('../connection');

const getFavourites = (userId) => {
  let queryString = `
                      SELECT *
                      FROM movies
                      LEFT JOIN favourites ON favourites.movie_id = movies.id
                      LEFT JOIN users ON favourites.user_id = users.id
                      WHERE favourites.user_id = ${userId}
                    `
  return db.query(queryString)
    .then(data => {
      return data.rows;
  });
}

module.exports = { getFavourites };
