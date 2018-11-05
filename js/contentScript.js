/**
 * Inject a script into the file.
 */
function injectScript(file, node) {
    let th = document.getElementsByTagName(node)[0];
    let s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript(chrome.extension.getURL('/js/web.js'), 'body');

let title, coords;

/** 
 * Listen for coordinates from web.js. When it receives the coordinates,
 * it sends them to main.js
 */
window.addEventListener('message', function(event) {
    if (event.source !== window) return;

    if (event.data.type && (event.data.type === 'POGO_COORDS')) {
        coords = {
            lat: event.data.lat,
            long: event.data.long
        };

        chrome.runtime.sendMessage({title, ...coords});
    }
}, false);

/** 
 * Add a listener that sets the title and kicks off some code in web.js
 */
chrome.runtime.onMessage.addListener(
    function(request, sender) {
        document.dispatchEvent(new CustomEvent('shouldSendCoords'));
        title = $('#infoboxtitle')[0].textContent;
    }
)
