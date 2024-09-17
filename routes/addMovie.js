const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get("/", (req, res) => {
  const templateVars = {
    cookie: req.cookies
  };
  res.render("addMovie", templateVars);
});

router.post("/", (req, res) => {
    const {title, year, price, quality, genre_id} = req.body;

    const queryString = `
    INSERT INTO movies (title, year, price, quality, genre_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;
    const values = [title, year, price, quality, genre_id];

    // console.log(values)
    db.query(queryString, values)
      .then(() => {
        return res.redirect(302, "/")
      })
      .catch(err => {
       console.log('query error:', err);
       res.status(500).send('Error: Please enter all forms with the required Information');
      })
})

module.exports = router;
