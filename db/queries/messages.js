const { query } = require('express');
const db = require('../connection');

const fetchMessagesByRoom = (room) => {
  // Check if logged in...
  if (!room) {
    console.error("Room undefined");
    return Promise.resolve([]);
  }

  // Logged in! Pull msgs from DB...
  let queryString = `
  SELECT users.name, messages.content
  FROM messages
  JOIN users ON messages.user_id = users.id
  WHERE messages.room_id = ${room}
  `

  return db.query(queryString)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log("Error fetching messages by room:", error);
    });
}

const addMessageToDatabase = (message) => {
  const { user_id, content, room_id } = message;

  // Add message into DB...
  let queryString = `
  INSERT INTO messages (user_id, content, room_id) 
  VALUES (${user_id}, ${content}, ${room_id})
`
  return db.query(queryString)
    .then(data => {
      return data.rows
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = { fetchMessagesByRoom, addMessageToDatabase };