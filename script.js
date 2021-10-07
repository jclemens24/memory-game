let ready = (callback) => {
	if (document.readyState != 'loading') callback();
	else document.addEventListener('DOMContentLoaded', callback);
};

const resetBtn = document.getElementById('reset');
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let boardLock = false;

function flipCard() {
	if (boardLock) return;
	if (this === firstCard) return;

	this.classList.toggle('flip');

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;

		return;
	}
	hasFlippedCard = false;
	secondCard = this;

	checkForMatch();
}
//Check for a match
function checkForMatch() {
	let matchMade = firstCard.dataset.framework === secondCard.dataset.framework;

	matchMade ? disableCards() : unflipCards();
}
//Called when a match occurs
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	boardReset();
}

function unflipCards() {
	boardLock = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		boardReset();
	}, 1500);
}

function boardReset() {
	[hasFlippedCard, boardLock] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function shuffleCards() {
	cards.forEach((card) => {
		let randomizer = Math.floor(Math.random() * 12);
		card.style.order = randomizer;
	});
}

cards.forEach((card) => card.addEventListener('click', flipCard));

//Let Start Button Reset Game and Cards
let startBtn = document.getElementById('start');
startBtn.addEventListener('click', function () {
	cards.forEach((card) => {
		card.classList.remove('flip');
	});
	shuffleCards();
});

resetBtn.addEventListener('click', function () {
	cards.forEach((card) => {
		card.classList.remove('flip');
	});
});
