// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const movies = require('./db/queries/movies');
const messages = require('./db/queries/messages');
const users = require(`./db/queries/users`);

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const addMovieRoutes = require('./routes/addMovie')
const moviesRoutes = require('./routes/movies');
const favouritesRoutes = require('./routes/favourites');
// const { getAllMovies } = require('./db/queries/movies');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/addMovie', addMovieRoutes);
app.use('/movies', moviesRoutes);
app.use('/favourites', favouritesRoutes)
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.redirect('/movies');
});

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// SOCKET.IO INITIALIZE
const { Server } = require('socket.io');
const io = new Server(server);
const cookie = require("cookie");

io.on('connection', (socket) => {
  // const thisUser = socket.id;
  // User connects, send them to static 'some room' room...
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');
  const thisUser = cookies.userId;
  const userType = cookies.userType;
  // console.log("THIS USER:", thisUser);
  // console.log("USERTYPE", userType);

  let joinRoom;
  // If admin, log into multiple rooms...
  if (userType === 'admin') {
    // Default to room 1.
    joinRoom = "1";
  } else {
    joinRoom = thisUser;
  };

  socket.join(joinRoom);

  messages.fetchMessagesByRoom(joinRoom)
    .then(messages => {
      socket.emit('load old messages', messages);
    })
    .catch(error => {
      console.log("Error fetching old messages:", error);
    });

  // User connects...
  console.log('MSG to server: a user connected!');
  io.to(joinRoom);

  // User disconnects...
  socket.on('disconnect', () => {
    // Remove user from static 'some room' room...
    socket.leave(joinRoom);
    console.log('user disconnected');
  });

  // CHAT MESSAGE recieved from client...
  socket.on('chat message', (msg) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const thisUser = cookies.userId;
    const currentRoom = Array.from(socket.rooms.keys())[1];

    // Scrub single quotes from msg...
    const safeMsg = msg.replace(/'/g, "");

    // Generate message object for DB...
    const msgObj = {
      user_id: thisUser,
      content: ("'" + safeMsg + "'"),
      room_id: currentRoom
    };

    // Add message object to DB...
    messages.addMessageToDatabase(msgObj);

    users.getUserName(thisUser)
      .then(nameArr => {
        const name = nameArr[0].name;
        io.to(currentRoom).emit('chat message', { name, msg });
      })
      .catch(error => {
        console.log("Error getting username:", error);
      })
  });

  // Change user chat as admin...
  socket.on('change-user', () => {
    const currentRoom = Array.from(socket.rooms.keys())[1];
    const newRoom = (currentRoom === "1") ? "3" : "1";

    socket.leave(currentRoom);
    socket.join(newRoom);

    messages.fetchMessagesByRoom(newRoom)
      .then(messages => {
        socket.emit('load old messages', messages);
        io.to(newRoom);
      })
      .catch(error => {
        console.log("Error fetching old messages:", error);
      });
  })

  // Recieve timeout message from client...
  socket.on('request', (arg1, arg2, callback) => {
    callback({
      status: 'ok'
    });
  });

  // Send client timeout message...
  socket.timeout(5000).emit('request', { foo: 'bar' }, 'baz', (err, response) => {
    if (err) {
      // the client did not acknowledge the event
    } else {
      console.log(response.status); // 'ok'
    }
  });
});