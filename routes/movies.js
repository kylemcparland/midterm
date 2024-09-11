const express = require('express');
const router = express.Router();
const { getAllMovies } = require('../db/queries/movies');

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
        cookie: req.headers.cookie, // Store cookie information in templateVars
        movies: moviesData // Store movie database information in templateVars
      };
      res.render('index', templateVars)
    })
});

module.exports = router;
