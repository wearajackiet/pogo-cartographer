/**
 * Ensures that this only runs on pokemongomap.info.
 */
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'www.pokemongomap.info'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
