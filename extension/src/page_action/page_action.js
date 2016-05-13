var betfairRequest;

function setBetfairRequest(tab) {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
			betfairRequest.win = document.getElementById("betfair-data-win").value;
			betfairRequest.place = document.getElementById("betfair-data-place").value;
			chrome.extension.getBackgroundPage().setBetfairRequest(tab.id, betfairRequest);
			var storage = {},
				key = tab.url;
			storage[key] = {
				win: betfairRequest.win,
				place: betfairRequest.place
			};
			chrome.storage.local.set(storage, function() {
				console.log('Betfair request saved to storage');
			});
		}
	);
}

function test() {
	chrome.extension.getBackgroundPage().test();
}

function closePopup() {
	window.close();
}

function go() {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
		var thisTab = tabs[0],
			dashboardUrl = 'src/dashboard/index.html#' + thisTab.id,
			extensionUrl = chrome.extension.getURL(dashboardUrl);

		setBetfairRequest(thisTab);

		chrome.tabs.query({}, function(tabs) {
			var found;
			tabs.forEach(function(tab) {
				if (tab.openerTabId === thisTab.id) {
					found = tab;
				}
			});
			if (found) {
				// todo-timur: activate tab
				chrome.tabs.update(found.id, {active: true});
			} else {
				chrome.tabs.create({url: extensionUrl, openerTabId: thisTab.id});
			}
		});
	});
}

function initialize() {
	console.log('initializing');

	function initBetfairControls() {
		console.log('initBetfairControls()', betfairRequest);
		document.getElementById('betfair-data-win').value = betfairRequest.win;
		document.getElementById('betfair-data-place').value = betfairRequest.place;
	}

	// Get page config data from background script
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

		var storageKey = tabs[0].url;

		// Get betfair request
		var data = chrome.extension.getBackgroundPage().getBetfairRequest(tabs[0].id);
		if (data) {
			betfairRequest = data;
			initBetfairControls();
		} else {
			betfairRequest = {};
			// try load betfair params from storage
			chrome.storage.local.get(storageKey, function(items) {
				var savedBetfair = items[storageKey];
				if (savedBetfair) {
					betfairRequest.win = savedBetfair.win;
					betfairRequest.place = savedBetfair.place;
					initBetfairControls();
				}
			});
		}

		// Get storage info
		chrome.storage.local.getBytesInUse(storageKey, function(bytesInUse) {
			document.getElementById("used-storage").innerText = bytesInUse;
		});
	});

	// Attach event handlers to page controls
	document.getElementById("btn-go").addEventListener("click", go);
}

window.addEventListener("load", initialize);