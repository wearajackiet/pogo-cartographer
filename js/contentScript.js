// Inject a script into the file.
function injectScript(file, node) {
    let th = document.getElementsByTagName(node)[0];
    let s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript(chrome.extension.getURL('/js/web.js'), 'body');

let coords;

// Listen for coordinates from web.js
window.addEventListener('message', function(event) {
    if (event.source !== window) return;

    if (event.data.type && (event.data.type === "POGO_COORDS")) {
        coords = {
            lat: event.data.lat,
            long: event.data.long
        };
    }
}, false);

// Add a listener that sends the data to main.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        setTimeout(function() {
            document.dispatchEvent(new CustomEvent('shouldSendCoords'));
        }, 0);
        
        sendResponse({
            title: $('#infoboxtitle')[0].textContent,
            ...coords
        });
    }
)
