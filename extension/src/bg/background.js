// This script gathers all data and matches back and lay data.
// Page scripts (injected) send messages to this script with back data, listener here handles them.
// Also this script polls betfair for all URLs specified in betfairRequests.

var dataCallback;
var betfairRequests = {};
var betfair = createBetfair();
var matching = new Matching();

function test() {
	console.log('TEST', betfairRequests);
}

function registerCallback(callback) {
	if (dataCallback) {
		console.log('Backend: callback already registered, rewriting');
	}
	dataCallback = callback;
	console.log('Backend: callback registered successfully');
}

function doCallback() {
	if (dataCallback) {
		try {
			dataCallback(matching);
		} catch(e) {
			console.log('Backend: Callback error ', e)
		}
	}
}

function setBetfairRequest(tabId, data) {
	betfairRequests[tabId] = data;
	console.log('Backend: setBetfairRequest():', tabId, data);
}

function getBetfairRequest(tabId) {
	return betfairRequests[tabId];
}

function updateBetfairData(data) {
	// todo-timur: update betfair data and notify open tabs
	console.log('Backend: updateBetfairData():', data);
	doCallback();
}

// Poll betfair data for events
setInterval(function() {
	var key, marketIds = {}, marketIdsArr = [];

	// todo-timur: this won't work, need to have a map tabId -> marketIds to later send notifications to these tabs

	for (key in betfairRequests) {
		if (betfairRequests.hasOwnProperty(key)) {
			var data = betfairRequests[key];
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
	//console.log('Betfair request', marketIdsArr);
	marketIds = marketIdsArr.join(',');
	if (marketIds) {
		betfair.getMarketPrices(marketIds, function (data) {
			updateBetfairData(data);
		})
	}
}, 5000);


// Handle message from the inject scripts
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	chrome.pageAction.show(sender.tab.id);
	console.log('Background: message received', sender.tab.id, request);
	var data = {
		id: sender.tab.id,
		url: sender.tab.url,
		betfair: betfairRequests[sender.tab.id],
		data: request.data
	};
	matching.updateEventData(sender.tab.id, data);
	doCallback();
	sendResponse();
});

chrome.tabs.onRemoved.addListener(function callback(tabId) {
	delete betfairRequests[tabId];
	console.log('Tab closed, removed tab data', tabId, betfairRequests);
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
