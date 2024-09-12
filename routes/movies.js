const express = require('express');
const router = express.Router();
const { getAllMovies, deleteMovie } = require('../db/queries/movies');

// GET MOVIES:
router.get("/", (req, res) => {
  const queryParams = {
    title: req.query.query,
    genre: Number(req.query.select_genre),
    maxPrice: Number(req.query.max_price) * 100,
    year: Number(req.query.year),
    minQuality: Number(req.query.min_quality),
    sort: req.query.sort
  };

  // console.log(queryParams);
  // console.log(req.query)
  getAllMovies(queryParams)
    .then(moviesData => {
      const templateVars = {
        cookie: req.cookies, // Store cookie information in templateVars
        movies: moviesData // Store movie database information in templateVars
      };
      res.render('index', templateVars)
    })
});

// DELETE MOVIE:
router.post("/:id/delete", (req, res) => {
  console.log(req.params.id);
  const movieTitle = req.params.id;

  deleteMovie(movieTitle)
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log("Error deleting movie:", err);
      res.status(500).send("Server error");
    });
});

module.exports = router;
