// Set up the button initial element state
const playElement = document.createElement('div');
playElement.classList.add('party-horn-button');
playElement.style.cssText = 'display: none; width: 50px; height: 50px; cursor: pointer; position: fixed; top: 5px; right: 5px; z-index: 99999; background: center no-repeat url(' + chrome.runtime.getURL('icon.png') + '); background-size: 100% 100%;';

// Append button to HTML body
document.body.appendChild(playElement);

// Make sure to initialize the 'toggle' flag as false (i.e. extension is hidden)
chrome.storage.local.set({ toggle: false });

// Initialize horn audio
const horn = new Audio(chrome.runtime.getURL('horn.ogg'));

// Audio button event listener
document.body.addEventListener('click', (e) => {
	// Toggle play
	if (e.target.classList && e.target.classList.contains('party-horn-button')) {
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

// Storage event listener to act on 'toggle' flag changes
chrome.storage.onChanged.addListener(function(changes, namespace){
	if(namespace == "local" && changes.toggle) { 
		playElement.style.display = (changes.toggle.newValue) ? "block" : "none";
	}
});