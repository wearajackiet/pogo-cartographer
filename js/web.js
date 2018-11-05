/**
 * When it receives "shouldSendCoords" from contentScript.js,
 * it grabs the coordinates from the window and sends it back
 * to contentScript.js
 */
document.addEventListener('shouldSendCoords', function() {
    const lat = window.storecurrentmarkerlat;
    const long = window.storecurrentmarkerlng;
    window.postMessage({type: 'POGO_COORDS', lat, long}, '*');
}, false);