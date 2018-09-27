document.addEventListener('shouldSendCoords', function() {
    const lat = window.storecurrentmarkerlat;
    const long = window.storecurrentmarkerlng;
    window.postMessage({type: 'POGO_COORDS', lat, long}, '*');
}, false);