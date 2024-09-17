const express = require('express');
const router = express.Router();
const { getAllMovies, deleteMovie, markAsSold } = require('../db/queries/movies');
const { appendRatingToMovie, fetchMovieImageFromTMDb } = require('../db/queries/omdb_api');
const { getFavourites } = require('../db/queries/favourites');

// GET MOVIES:
router.get("/", async (req, res) => {
  try {
    const queryParams = {
      title: req.query.query,
      genre: Number(req.query.select_genre),
      maxPrice: Number(req.query.max_price) * 100,
      year: Number(req.query.year),
      minQuality: Number(req.query.min_quality),
      sort: req.query.sort
    };

    // Fetch movies from DB...
    const movies = await getAllMovies(queryParams)
    const favourites = await getFavourites(req.cookies.userId)

    // Fetch ratings of each movie from API...
    const moviesWithRatings = await appendRatingToMovie(movies);

    const moviesWithImages = await Promise.all(moviesWithRatings.map(async (movie) => {
      const image_url = await fetchMovieImageFromTMDb(movie.title);
      return {
        ...movie,
        image_url
      };
    }));

    const top10NewestMovies = moviesWithImages.slice().sort((a, b) => b.year - a.year).slice(0, 10);

    // Send movies with ratings to front end...
    const templateVars = {
      cookie: req.cookies, // Store cookie information in templateVars
      movies: moviesWithImages, // Store movie database information in templateVars
      favourites: favourites,
      top10NewestMovies: top10NewestMovies
    };
    res.render('index', templateVars)
  } catch (error) {
    console.error("Error getting movies:", error);
  }
});

// DELETE MOVIE:
router.post("/:id/delete", (req, res) => {
  const movieId = req.params.id;

  deleteMovie(movieId)
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log("Error deleting movie:", err);
      res.status(500).send("Server error");
    });
});

// MARK AS SOLD:
router.post("/:id", (req, res) => {
  const movieId = req.params.id;

  markAsSold(movieId)
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log("Error marking movie as sold:", err);
      res.status(500).send("Server error");
    });
});

module.exports = router;
