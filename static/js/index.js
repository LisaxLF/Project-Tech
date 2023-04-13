// VIBRATION API
// Add a swipe event listener to the card
const matchingCard = document.querySelector(".swiperight")

matchingCard.addEventListener("click", function (event) {
	// Controleert of de Vibration API word gesupport
	if ("vibrate" in navigator) {
		// Vibrate heel kort
		navigator.vibrate(100);
	} else {
		// Als de Vibration API niet word gesupport
		console.log("Vibration not supported");
	}
});