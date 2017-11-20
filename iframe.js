window.onload = () => {
  let input = document.getElementById('new-message')
  let parentWindow;
  let id;

  window.addEventListener('message', function(event) {
    if (!parentWindow) {
      parentWindow = event.source
      id = event.data.id
    }
    if (event.data.type === 'new_chat' || event.data.type === 'new_user') {
      newChat(event.data)
    } else if (event.data.type === 'new_message') {
      newMessage(event.data)
    }
  })

  function newMessage(data) {
    const newPost = document.createElement('P');
    newPost.className = 'new-post'
    const text = document.createTextNode(`[User ${data.id}] ${data.message}`);
    newPost.appendChild(text);
    document.getElementById('chat').appendChild(newPost)
    input.value = '';
  }

  function newChat(data) {
    const intro = document.createElement('P');
    intro.className = 'intro';
    const text = document.createTextNode(`User ${data.id} has joined the chat.`);
    intro.appendChild(text);
    document.getElementById('chat').appendChild(intro);
  }

  window.submitMessage = () => {
    console.log('SUBMIT MESSAGE', input.value)
    console.log('ID?', id)
    parentWindow.postMessage({
      type: 'new_message',
      id: id,
      message: input.value
    }, '*');
  }
}

