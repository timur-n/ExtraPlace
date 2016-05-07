function showMainPage() {
	chrome.tabs.create({url: chrome.extension.getURL('src/dashboard/index.html')});
}

function initialize() {
	console.log('initializing');
	document.getElementById("show-main-btn").addEventListener("click", showMainPage);
}

window.addEventListener("load", initialize);