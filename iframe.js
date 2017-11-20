window.onload = () => {
  const input = document.getElementById('new-message')
  let parentWindow, id;
  window.addEventListener('message', function(event) {
    if (!parentWindow) {
      parentWindow = event.source
    }
    if (event.data.type === 'new_message') {
      console.log('IFRAME EVENT:', event)
      console.log('INPUT: ', input.value)
      newMessage(input.value)
    }
  })

  function newMessage(message) {
    console.log('GETTING HERE?')
    const newPost = document.createElement('P');
    const text = document.createTextNode(message);
    newPost.appendChild(text);
    document.getElementById('chat').appendChild(newPost)
  }

  window.submitMessage = () => {
    console.log('input event:', event)
    parentWindow.postMessage({
      type: 'new_message',
      sender: id,
      message: input.value
    }, '*')
  }
}

