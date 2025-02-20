const fruits = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🍊"];
let cards = [...fruits, ...fruits]; // Duplicate for pairs
cards.sort(() => Math.random() - 0.5); // Shuffle

const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
let firstCard, secondCard;
let lockBoard = false;
let moves = 0;

// Create game cards
cards.forEach(fruit => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.fruit = fruit;
    card.innerHTML = "?"; // Hidden state
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.innerHTML = this.dataset.fruit;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkMatch();
    }
}

function checkMatch() {
    moves++;
    movesDisplay.textContent = moves;

    if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.innerHTML = "?";
            secondCard.innerHTML = "?";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkWin() {
    if (document.querySelectorAll(".flipped").length === cards.length) {
        document.getElementById("winMessage").style.display = "block";
    }
}

function checkMatch() {
    moves++;
    movesDisplay.textContent = moves;

    if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.innerHTML = "?";
            secondCard.innerHTML = "?";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}
