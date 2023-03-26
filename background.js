// Click event listener on extension icon to toggle the 'toggle' flag
chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {
			tabId: tab.id,
		},
		func: () => {
			chrome.storage.local.get(['toggle']).then((result) => {
				chrome.storage.local.set({ toggle: !result.toggle });
			});
		}
	});
});

// Storage event listener to change extension icon on 'toggle' flag changes
chrome.storage.onChanged.addListener(function(changes, namespace){
	if(namespace == "local" && changes.toggle) { 
		var actionIconPath = (changes.toggle.newValue) ? "icon-on.png" : "icon-off.png";
		chrome.action.setIcon({ path: actionIconPath });
	}
});