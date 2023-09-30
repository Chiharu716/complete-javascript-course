'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
//same as const score0 = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. check for rolled 1: if its true switch to the next player
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check score if players score is >= 100 -> finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //switch the player
      switchPlayer();
    }
  }
});

// btnNew.addEventListener('click', function () {
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   player0El.classList.add('player--active');
//   playing = true;
//   current0El = 0;
//   current1El = 0;
//   current0El.textcontent = 0;
//   current1El.textcontent = 0;
// });
// btnNew.addEventListener('click', function () {
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;

//   player0El.classList.remove('player--winner', 'player--active');
//   player1El.classList.remove('player--winner', 'player--active');
//   player0El.classList.add('player--active');
// });

btnNew.addEventListener('click', function () {
  // Remove the 'winner' and 'active' classes from both players
  player0El.classList.remove('player--winner', 'player--active');
  player1El.classList.remove('player--winner', 'player--active');

  // Reset scores and current scores
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Reset the active player to Player 1
  activePlayer = 0;
  player0El.classList.add('player--active');

  // Show the dice again
  diceEl.classList.add('hidden');

  // Enable gameplay
  playing = true;
});
