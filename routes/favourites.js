const express = require('express');
const router = express.Router();
const favourites = require('../db/queries/favourites')
const movies = require('../db/queries/movies')
const db = require('../db/connection');


router.get("/", (req, res) => {
  favourites.getFavourites(req.cookies.userId)
    .then(favouritesData => {
      const templateVars = {
        cookie: req.cookies,
        favourites: favouritesData
      };
      res.render('favourites', templateVars)
    })
});

// Favourite a movie, then reload the page
router.post("/:id", (req, res) => {
  const movieId = req.params.id;
  const userId = req.cookies.userId;
  const queryString = `INSERT INTO favourites (user_id, movie_id) VALUES ($1, $2)`;
  db.query(queryString, [userId, movieId])
    .then(() => {
      res.redirect('back')
    })
    .catch(error => {
      console.error('Error insertingdata into the database', error);
      res.status(500).send('Internal Server Error');
    })
})

// Un-favourite a movie, then reload the page
router.post("/:id/delete", (req, res) => {
  const movieId = req.params.id;
  const userId = req.cookies.userId;
  const queryString = `DELETE FROM favourites WHERE user_id = $1 AND movie_id = $2`;
  db.query(queryString, [userId, movieId])
    .then(() => {
      res.redirect('back');
    })
    .catch(error => {
      console.error('Error deleting from the database', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
