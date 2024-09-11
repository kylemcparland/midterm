const express = require('express');
const router = express.Router();

// => LOGOUT:
router.get("/", (req, res) => {
  res.clearCookie("userType");
  res.clearCookie("userId");
  return res.redirect(302, "/login");
});

module.exports = router;
