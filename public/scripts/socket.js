const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const changeUserButton = document.getElementById('change-user');

// Send form data to server...
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

if (changeUserButton) {
  // Admin button to change chat window...
changeUserButton.addEventListener('click', (e) => {
  messages.innerHTML = '';
  socket.emit('change-user');
})};

// Initialized server SERVER MSG confirmation...
socket.on('server msg', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  // window.scrollTo(0, document.body.scrollHeight);
});

// Receive CHAT MESSAGE message from server...
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  // window.scrollTo(0, document.body.scrollHeight);
});

// Populate with old messages...
socket.on('load old messages', (oldMessages) => {
  if (oldMessages) {
    for (let log of oldMessages) {
      const item = document.createElement('li');
      item.textContent = (log.name + ": " + log.content);
      messages.appendChild(item);
    }
  }
})

// Send server connection timeout...
socket.timeout(5000).emit('request', { foo: 'bar' }, 'baz', (err, response) => {
  if (err) {
    // the server did not acknowledge the event in the given delay
  } else {
    console.log(response.status); // 'ok'
  }
});



// Receive server connection timeout...
socket.on('request', (arg1, arg2, callback) => {
  // console.log(arg1); // { foo: 'bar' }
  // console.log(arg2); // 'baz'
  callback({
    status: 'ok'
  });
});
