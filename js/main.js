const stopCoords = document.getElementById('stopCoords');
const stopName = document.getElementById('stopName');
const getStop = document.getElementById('getStopButton');

chrome.storage.sync.get('data', function(data) {
    setFields(data);
});

function setFields(data) {
    chrome.extension.getBackgroundPage().console.log(data);
    if (data.hasOwnProperty('title')) {
        stopName.value = data.title;
    }
    if (data.hasOwnProperty('lat')) {
        stopCoords.value = '' + data.lat + ', ' + data.long;
    }
}

getStop.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {ready: "ready!"}, function(response) {
            setFields(response);
            const {title, lat, long} = reponse;
            chrome.storage.sync.set({title, lat, long});
        });
    });
};