'use strict';

window.onload = () => {
  window.addIFrame = () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'iframe.html';
    iframe.id = 'iframe'
    document.body.appendChild(iframe);

    iframe.onload = () => {
      emitToIframe({
        type: 'new_chat',
        id: 'iframe'
      }, iframe.contentWindow)
    }
  }
}

function emitToIframe (payload, iframe) {
  iframe.postMessage(payload, '*')
}

function emitToIframes(payload) {
  let iframes = window.frames
  for (let i = 0; i < frames.length; i++) {
    if (iframes[i]) {
      emitToIframe(payload, iframes[i])
    }
  }
}

window.addEventListener('message', (event) => {
  console.log('App Event', event);
  if (event.data.type === 'new_message') {
    emitToIframes(event.data)
  }
})
