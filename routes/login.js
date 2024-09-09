/*
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// => LOGIN PAGE:
router.get("/", (req, res) => {
  // Serve cookie to login page
  const templateVars = {
    cookie: req.headers.cookie
  };
  res.render("login", templateVars);
});

// => LOGIN POST:
router.post("/", (req, res) => {
  // If email is "admin@1.com, assign "admin" cookie...
  if (req.body.email === "admin@1.com") {
    res.cookie("userType", "admin");
    // Else, assign "user" cookie...
  } else {
    res.cookie("userType", "user");
  }
  // Redirect to homepage...
  return res.redirect(302, "/");
});

module.exports = router;
