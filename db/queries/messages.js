const { query } = require('express');
const db = require('../connection');

const fetchMessagesByRoom = (room) => {
  let queryString = `
  SELECT users.name, messages.content
  FROM messages
  JOIN users ON messages.user_id = users.id
  WHERE messages.room_id = ${room}
  GROUP BY users.name, messages.content;
  `

  return db.query(queryString)
  .then(data => {
    return data.rows;
});
}

module.exports = { fetchMessagesByRoom };