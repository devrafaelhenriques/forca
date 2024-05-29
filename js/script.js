let words = [''];
let chosenWord;
let correctWord = "";
let letters = [];
let tries = 10;
let gameOver = false;

function pickRandomWord() {

    chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    drawLines();
    return chosenWord;

}

function checkLetter(letter) {

    if (!gameOver) {

        if (!letters.includes(letter)) {

            letters.push(letter);

            if (chosenWord.includes(letter)) {

                for (let i = 0; i < chosenWord.length; i++) {

                    if (chosenWord[i] === letter) {

                        drawCorrectLetter(i);
                        addCorrectLetter(i);

                    }
                }

                checkGameOver();
                disableKey(letter, "correct");

            } else {

                tries--;
                drawHangman();
                checkGameOver();
                disableKey(letter, "incorrect");

            }
        }
    }
}

function checkGameOver() {

    if (tries == 0) {

        showEndGameText("lose", "Vish... perdeu foi?");
        gameOver = true;

    }
    if (correctWord.length === chosenWord.length) {

        showEndGameText("win", "Temos um vencedoooor, jogou muitooo!");
        gameOver = true;

    }
}

function addCorrectLetter(i) {

    correctWord += chosenWord[i].toUpperCase();

}

function disableKey(key, status) {

    const keysButtons = document.querySelectorAll('.letter');
    for (let i = 0; i < keysButtons.length; i++) {

        if (keysButtons[i].textContent === key) {

            keysButtons[i].classList.add(status);
            break;

        }
    }
}

function addListeners() {

    window.addEventListener('keydown', (e) => {

        let letter = e.key.toUpperCase();
        if (keys.toString().includes(letter)) {

            checkLetter(letter);

        }
    });

    const keysButtons = document.querySelectorAll('.letter');
    keysButtons.forEach(key => key.addEventListener('click', () => {

        let letter = key.textContent;
        checkLetter(letter);

    }));
}