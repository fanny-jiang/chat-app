'use strict';

window.onload = () => {
  const iframes = window.frames;

  // Add IFrame on click event
  window.addIFrame = () => {
    const iframe = document.createElement('iframe');
    const iframeId = iframes.length + 1;
    iframe.src = 'iframe.html';
    const container = document.getElementById('container')
    container.appendChild(iframe);

    // For a new iframe, emit event to iframe
    iframe.onload = () => {
      emitToIframe({
        type: 'new_chat',
        id: iframeId
      }, iframe.contentWindow)
    }

    // When a new user adds iframe, emit all event to all iframes
    emitToAllIframes({
      type: 'new_user',
      id: iframeId
    });
  }

  // Emits message payload to iframes via postMessage
  function emitToIframe (payload, iframe) {
    iframe.postMessage(payload, '*')
  }

  // Emits payload to each of the iframes on the parent page
  function emitToAllIframes(payload) {
    for (let i = 0; i < iframes.length; i++) {
      if (iframes[i]) {
        emitToIframe(payload, iframes[i])
      }
    }
  }

  // Event listener, listens to new messages from iframes
  window.addEventListener('message', function (event) {
    if (event.data.type === 'new_message') {
      emitToAllIframes(event.data)
    }
  });
}
