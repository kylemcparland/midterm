const express = require('express');
const router = express.Router();
const favourites = require('../db/queries/favourites')
const db = require('../db/connection');


router.get("/", (req, res) => {
  favourites.getFavourites(req.cookies.userId)
    .then(favouritesData => {
      const templateVars = {
        cookie: req.cookies,
        movies: favouritesData
      };
      res.render('favourites', templateVars)
    })
});

module.exports = router;
