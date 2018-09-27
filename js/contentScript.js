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
        console.log(`contentScript.js: ${event.data.lat}, ${event.data.long}`);
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

        // TODO: the reason this is showing previous coordinates is because
        // it's sending the response before we get updated coordinates from
        // web.js. Figure out how to delay the sendResponse until the data
        // is fresh.
        console.log(`sendResponse: ${JSON.stringify(coords)}`);
        
        sendResponse({
            title: $('#infoboxtitle')[0].textContent,
            ...coords
        });
    }
)
