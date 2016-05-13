// This script gathers all data and matches back and lay data.
// Page scripts (injected) send messages to this script with back data, listener here handles them.
// Also this script polls betfair for all URLs specified in betfairData.

var dataCallback;
var betfairData = {};
var betfair = createBetfair();

function test() {
	console.log('TEST', betfairData);
}

function register(callback) {
	dataCallback = callback;
}

function setBetfairData(tabId, data) {
	betfairData[tabId] = data;
	console.log('setBetfairData():', tabId, data);
}

function updateBetfairData(data) {
	// todo-timur: update betfair data and notify open tabs
	console.log('updateBetfairData():', data);
}

// Poll betfair data for events
setInterval(function() {
	var key, marketIds = {}, marketIdsArr = [];

	// todo-timur: this won't work, need to have a map tabId -> marketIds to later send notifications to these tabs

	for (key in betfairData) {
		if (betfairData.hasOwnProperty(key)) {
			var data = betfairData[key];
			var marketId = betfairUrlToMarketId(data.win);
			marketIds[marketId] = true;
			marketId = betfairUrlToMarketId(data.place);
			marketIds[marketId] = true;
		}
	}
	for (key in marketIds) {
		if (marketIds.hasOwnProperty(key)) {
			marketIdsArr.push(key);
		}
	}
	console.log('Betfair request', marketIdsArr);
	marketIds = marketIdsArr.join(',');
	if (marketIds) {
		betfair.getMarketPrices(marketIds, function (data) {
			updateBetfairData(data);
		})
	}
}, 5000);


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	chrome.pageAction.show(sender.tab.id);
	console.log('Background: message received', sender.tab.id, request);
	var data = {
		id: sender.tab.id,
		url: sender.tab.url,
		betfair: betfairData[sender.tab.id],
		data: request.data
	};
	if (dataCallback) {
		try {
			dataCallback(data);
		} catch(e) {
		}
	}
	sendResponse();
});

chrome.tabs.onRemoved.addListener(function callback(tabId) {
	delete betfairData[tabId];
	console.log('Tab closed, removed tab data', tabId, betfairData);
});

/*
// For long-lived external connections:
chrome.runtime.onConnectExternal.addListener(function(port) {
	console.log('External connection');
	port.onMessage.addListener(function(msg) {
		console.log('External message', msg);
		port.postMessage({ok: true, data: data});
	});
});
*/
