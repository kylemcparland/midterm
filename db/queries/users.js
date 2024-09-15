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
      console.log("Error:", err);
    });
};

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserName = (userId) => {
  return db.query(`SELECT DISTINCT name FROM users WHERE id = ${userId};`)
    .then(data => {
      return data.rows;
    });
}

module.exports = { getUsers, getUserTypeByEmail, getUserName };
