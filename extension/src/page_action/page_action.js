function showMainPage() {
	chrome.tabs.create({url: chrome.extension.getURL('src/dashboard/index.html' + '#')});
}

function setBetfairData() {
	chrome.tabs.query(
		{
			currentWindow: true,
			active: true
		},
		function (tabArray) {
			var tabId = tabArray[0].id;
			var winUrl = document.getElementById("betfair-data-win").value;
			var placeUrl = document.getElementById("betfair-data-place").value;
			chrome.extension.getBackgroundPage().setBetfairData(tabId, {win: winUrl, place: placeUrl});
		}
	);
}

function test() {
	chrome.extension.getBackgroundPage().test();
}

function initialize() {
	console.log('initializing');
	document.getElementById("show-main-btn").addEventListener("click", showMainPage);
	document.getElementById("set-betfair-btn").addEventListener("click", setBetfairData);
	document.getElementById("test-btn").addEventListener("click", test);
}

window.addEventListener("load", initialize);