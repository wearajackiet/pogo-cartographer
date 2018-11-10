/**
 * Ensures that this only runs on pogomap.info.
 */
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'www.pogomap.info'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
