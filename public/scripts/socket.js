const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const changeUserButton = document.getElementById('change-user');
const toggleChat = document.getElementById('toggle-chat');
const toggleIcon = document.getElementById('toggle-icon');
const chatArea = document.getElementById('chat-area');

// Toggle chat button...
toggleChat.addEventListener('click', function () {
  if (chatArea.style.bottom === '-410px') {
    chatArea.style.bottom = '0px';
    toggleIcon.classList.remove('fa-chevron-up');
    toggleIcon.classList.add('fa-chevron-down');
  } else {
    chatArea.style.bottom = '-410px';
    toggleIcon.classList.remove('fa-chevron-down');
    toggleIcon.classList.add('fa-chevron-up');
  }
});

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
  })
};

// Initialized server SERVER MSG confirmation...
socket.on('server msg', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

// Receive CHAT MESSAGE message from server...
socket.on('chat message', ({ name, msg }) => {
  const item = document.createElement('li');
  item.textContent = (name + ": " + msg);
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

// Populate with old messages...
socket.on('load old messages', (oldMessages) => {
  if (oldMessages) {
    for (let log of oldMessages) {
      const item = document.createElement('li');
      item.textContent = (log.name + ": " + log.content);
      messages.appendChild(item);
    }

    // Connection greeting...
    const greeting = document.createElement('li');
    greeting.textContent = ("Connected to room!");
    greeting.style.fontWeight = 'bold';
    greeting.style.backgroundColor = '#ffffff';
    greeting.style.border = 'none';
    messages.appendChild(greeting);
    messages.scrollTop = messages.scrollHeight;
  }
})

// Send server connection timeout...
socket.timeout(5000).emit('request', { foo: 'bar' }, 'baz', (err, response) => {
  if (err) {
    // the server did not acknowledge the event
  } else {
    console.log(response.status); // 'ok'
  }
});

// Receive server connection timeout...
socket.on('request', (arg1, arg2, callback) => {
  callback({
    status: 'ok'
  });
});
