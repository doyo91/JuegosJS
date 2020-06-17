const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

// Se elige una palabra al azar
let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Mostrar palabra oculta | Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
    `;

	const innerWord = wordEl.innerText.replace(/\n/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Felicidades! Tú ganas! 😃';
		popup.style.display = 'flex';

		playable = false;
	}
}

// Actualiza las letras incorrectas | Update the wrong letters
function updateWrongLettersEl() {
	// Muestra letras equivocadas | Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Equivocadas</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

	// Muestra partes | Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Comprobar si ha perdido | Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Lástima, tú pierdes. 😕';
		popup.style.display = 'flex';

		playable = false;
	}
}

// Muestra notificacion | Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Recoge la letra pulsada | Keydown letter press
window.addEventListener('keydown', (e) => {
	if (playable) {
        /* el caracter leido tiene que estar entre los siguientes keycodes */
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();
            /* Si la palabra elegida contiene la letra */
			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Reinicia el juego y vuelve a jugar | Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//Reinicia arrays |  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();
