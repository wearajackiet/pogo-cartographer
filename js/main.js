const stopCoords = document.getElementById('stopCoords');
const stopName = document.getElementById('stopName');
const getStop = document.getElementById('getStopButton');
const copyCoords = document.getElementById('copyCoords');
const copyName = document.getElementById('copyName');

/**
 * Sets the corresponding fields in the popup to the correct values.
 * @param {Object} data Object should have title and coordinates.
 */
function setFields(data) {
    if (data && data.hasOwnProperty('title')) {
        stopName.value = data.title;
    }
    if (data && data.hasOwnProperty('lat')) {
        stopCoords.value = '' + data.lat + ', ' + data.long;
    }
}

/**
 * When the "Get Stop" button is pushed, kick off a bunch of messages.
 * Also reset the clipboard images to be uncopied.
 */
getStop.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {ready: 'ready!'});
    });
    toggleClipboards();
};

/**
 * When this function receives a message from contentScript.js, it sets the fields
 * in the popup to their corresponding values.
 */
chrome.runtime.onMessage.addListener(function(response) {
    if (response) {
        setFields(response);
        const {title, lat, long} = reponse;
        chrome.storage.sync.set({title, lat, long});
    }
});

/**
 * When the clipboard next to name is clicked...
 * 1. Copy the coords to clipboard.
 * 2. Change the clipboad image next to the coordinates to be checked.
 */
copyCoords.onclick = function() {
    if (stopCoords.value) {
        copyToClipboard(stopCoords.value);
        toggleClipboards('coords');
    }
}

/**
 * When the clipboard next to name is clicked...
 * 1. Copy the name to clipboard.
 * 2. Change the clipboad image next to name to be checked.
 */
copyName.onclick = function() {
    if (stopName.value) {
        copyToClipboard(stopName.value);
        toggleClipboards('name');
    }
}

/**
 * Util function to copy a string to clipboard.
 */
function copyToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

/**
 * Util function to toggle the clipboard icons.
 * @param {string} input should be "coords" or "name".
 */
function toggleClipboards(input) {
    switch(input) {
        case 'coords':
            copyCoords.src = 'images/copied.png';
            copyName.src = 'images/copy.png';
            break;
        case 'name':
            copyName.src = 'images/copied.png';
            copyCoords.src = 'images/copy.png';
            break;
        default:
            copyName.src = 'images/copy.png';
            copyCoords.src = 'images/copy.png';
    }
}