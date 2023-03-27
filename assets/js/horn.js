// Check storage for the 'toggle' flag
chrome.storage.local.get(['toggle']).then((result) => {
	// Check if 'toggle' flag is defined, act accordingly
	let playElementDisplay = 'none';
	if (result.toggle === undefined) {
		chrome.storage.local.set({ toggle: false }); // Set 'toggle' to false, playElementDisplay is already false
	} else {
		playElementDisplay = (result.toggle) ? 'block' : 'none'; // The 'toggle' flag's already set, change playElementDisplay based on its value
	}
	
	// Set up the initial play element state
	let playElementIcon = chrome.runtime.getURL('/assets/images/icon.png');
	const playElement = document.createElement('div');
	playElement.setAttribute('id', 'party-horn-button');
	playElement.setAttribute('alt', 'Party Horn');
	playElement.setAttribute('title', 'Click here to party!');
	playElement.style.cssText = 'display: ' + playElementDisplay + '; width: 50px; height: 50px; cursor: pointer; position: fixed; top: 5px; right: 5px; z-index: 99999; background: center no-repeat url(' + playElementIcon + '); background-size: 100% 100%;';

	// Append button to HTML body
	document.body.appendChild(playElement);

	// Initialize horn audio
	const horn = new Audio(chrome.runtime.getURL('/assets/audio/horn.ogg'));

	// Audio button event listener
	document.body.addEventListener('click', (e) => {
		// Toggle play
		if (e.target.hasAttribute('id') && e.target.id == 'party-horn-button') {
			horn.currentTime = 0;
			horn.play();
		} else {
			horn.pause();
			horn.currentTime = 0;
		}
	});

	// ESC key event listener
	document.body.addEventListener('keyup', (e) => {
		// Stop play if ESC is pressed
		if (e.keyCode == 27) {
			horn.pause();
			horn.currentTime = 0;
		}
	});
});

// Storage event listener to act on 'toggle' flag changes
chrome.storage.onChanged.addListener(function(changes, namespace){
	if(namespace == "local" && changes.toggle) { 
		document.getElementById('party-horn-button').style.display = (changes.toggle.newValue) ? "block" : "none";
	}
});