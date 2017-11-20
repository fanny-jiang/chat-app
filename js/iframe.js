'use strict';

window.onload = () => {
  const input = document.getElementById('new-message');
  const messages = document.getElementById('chat');
  let parentWindow;
  let id;

  window.addEventListener('message', function(event) {
    // Set event source to be the parent window
    if (!parentWindow) {
      parentWindow = event.source
      id = event.data.id
    }
    // Depending on event type, a different element gets appended to DOM
    if (event.data.type === 'new_chat' || event.data.type === 'new_user') {
      newChat(event.data)
    } else if (event.data.type === 'new_message') {
      newMessage(event.data)
    }
  })

  // Appends a new message to the chat div element
  function newMessage(data) {
    const newPost = document.createElement('P');
    newPost.className = 'new-post'
    const text = document.createTextNode(`[User ${data.id}] ${data.message}`);
    newPost.appendChild(text);
    messages.appendChild(newPost);
    input.value = '';
  }

  // Appends system message to the chat div element
  function newChat(data) {
    const intro = document.createElement('P');
    intro.className = 'intro';
    const text = document.createTextNode(`User ${data.id} has joined the chat.`);
    intro.appendChild(text);
    messages.appendChild(intro);
  }

  // Emits payload to the parent container via postMessage
  window.submitMessage = () => {
    parentWindow.postMessage({
      type: 'new_message',
      id: id,
      message: input.value
    }, '*');
  }
}

