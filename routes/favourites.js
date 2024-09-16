const express = require('express');
const router = express.Router();
const favourites = require('../db/queries/favourites')
const movies = require('../db/queries/movies')
const db = require('../db/connection');
const { fetchMovieImageFromTMDb } = require('../db/queries/omdb_api')


const getFavouritesWithImages = async (userId) => {
  try {
    // Fetch favourite movie IDs
    const favouritesData = await favourites.getFavourites(userId);

    // Fetch images for each movie
    const favouritesWithImages = await Promise.all(favouritesData.map(async (favourite) => {
      const image_url = await fetchMovieImageFromTMDb(favourite.title); // Fetch image URL
      return {
        ...favourite,
        image_url
      };
    }));

    return favouritesWithImages;
  } catch (err) {
    console.error('Error fetching favourites with images:', err);
    throw err;
  }
};


router.get("/", async (req, res) => {
  if (!req.cookies.userId) {
    // Redirect to main page if user isn't logged in
    return res.redirect('/');
  }

  try {
    const favouritesWithImages = await getFavouritesWithImages(req.cookies.userId);
    const templateVars = {
      cookie: req.cookies,
      favourites: favouritesWithImages
    };
    res.render('favourites', templateVars);
  } catch (err) {
    // Handle any errors that occur while fetching favourites
    console.error('Error fetching favourites:', err);
    res.status(500).send('Internal Server Error');
  }
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
