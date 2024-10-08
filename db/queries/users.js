const db = require('../connection');

const getUserTypeByEmail = (email) => {
  const queryParams = [email];
  const queryString = `SELECT is_admin FROM users WHERE email = $1;`

  return db.query(queryString, queryParams)
    .then(data => {
      const isAdmin = data.rows[0].is_admin;
      return isAdmin;
    })
    .catch(err => {
      console.log("Error getting user type:", err);
    });
};

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserName = (userId) => {
  if (userId) {
    return db.query(`SELECT DISTINCT name FROM users WHERE id = ${userId};`)
      .then(data => {
        return data.rows;
      });
  } else {
    return "";
  }
}

module.exports = { getUsers, getUserTypeByEmail, getUserName };
