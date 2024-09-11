/*
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

// => LOGIN PAGE:
router.get("/", (req, res) => {
  // Serve cookie to login page
  const templateVars = {
    cookie: req.cookies
  };
  res.render("login", templateVars);
});

// => LOGIN POST:
router.post("/", (req, res) => {
  let userType;
  let userId;

  // Determine user type and user ID based on email
 switch (req.body.email) {
  // GENERIC ADMIN ACCOUNT
  case "admin@1.com":
    userType = "admin";
    userId = 0;
    break;
  case "kyle@gmail.com":
    userType = "user";
    userId = 1;
    break;
  case "merak@gmail.com":
    userType = "user"
    userId = 2;
    break;
  case "ben@gmail.com":
    userType = "user";
    userId = 3;
    break;
  // DEFAULT TO KYLE
  default:
    userType = "user";
    userId = 1;
 }

 // Set Cookies
 res.cookie("userType", userType);
 res.cookie("userId", userId);

 return res.redirect(302, "/")
});

module.exports = router;
