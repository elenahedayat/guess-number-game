let secret = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let finished = false;

const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const resetBtn = document.getElementById("reset-btn");
const guessBtn = form.querySelector(".guess-btn");
const character = document.getElementById("character");
const characterHint = document.getElementById("character-hint");

function setMessage(text) {
  messageEl.textContent = text;
  messageEl.hidden = !text;
}

function setCharacter(state, hint) {
  character.classList.remove("idle", "higher", "lower", "correct");
  void character.offsetWidth;
  character.classList.add(state);
  characterHint.textContent = hint;
}

function resetGame() {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  finished = false;
  attemptsEl.textContent = "0";
  input.value = "";
  input.disabled = false;
  guessBtn.disabled = false;
  setMessage("");
  setCharacter("idle", "Make a guess!");
  input.focus();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (finished) return;

  const guess = Number(input.value);

  if (!guess || guess < 1 || guess > 100) {
    setMessage("Enter 1–100");
    setCharacter("idle", "Pick a number from 1 to 100");
    return;
  }

  attempts += 1;
  attemptsEl.textContent = attempts;

  if (guess === secret) {
    setMessage("✓ Correct!");
    setCharacter("correct", "You got it");
    finished = true;
    input.disabled = true;
    guessBtn.disabled = true;
  } else if (guess < secret) {
    setMessage("↑ Higher ↑");
    setCharacter("higher", "Go higher!");
  } else {
    setMessage("↓ Lower ↓");
    setCharacter("lower", "Go lower!");
  }

  input.value = "";
  input.focus();
});

resetBtn.addEventListener("click", resetGame);

setCharacter("idle", "Make a guess!");