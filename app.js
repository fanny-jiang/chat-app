'use strict';

window.onload = () => {
  const iframes = window.frames;

  window.addIFrame = () => {
    const iframe = document.createElement('iframe');
    const iframeId = iframes.length + 1;
    iframe.src = 'iframe.html';
    const container = document.getElementById('container')
    container.appendChild(iframe);

    iframe.onload = () => {
      emitToIframe({
        type: 'new_chat',
        id: iframeId
      }, iframe.contentWindow)
    }

    emitToAllIframes({
      type: 'new_user',
      id: iframeId
    });
  }

  function emitToIframe (payload, iframe) {
    iframe.postMessage(payload, '*')
  }

  function emitToAllIframes(payload) {
    for (let i = 0; i < iframes.length; i++) {
      if (iframes[i]) {
        emitToIframe(payload, iframes[i])
      }
    }
  }

  window.addEventListener('message', (event) => {
    if (event.data.type === 'new_message') {
      emitToAllIframes(event.data)
    }
  });
}
