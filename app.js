'use strict';

function addIFrame() {
  const iframe = document.createElement('iframe');
  iframe.src = 'iframe.html';
  document.body.appendChild(iframe);
}

function newMessage() {
  const input = document.getElementById('new-message').elements[0].value;
  const newPost = document.createElement('P');
  const text = document.createTextNode(input);
  newPost.appendChild(text);
  const chat = document.getElementById('chat').appendChild(newPost)
}

