document.addEventListener('shouldSendCoords', function() {
    const lat = window.storecurrentmarkerlat;
    const long = window.storecurrentmarkerlng;
    console.log(`web.js: ${lat}, ${long}`);
    window.postMessage({type: 'POGO_COORDS', lat, long}, '*');
}, false);