/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Random Number
    let dices = [];
    dices[0] = Math.floor(Math.random() * 6) + 1;
    dices[1] = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    // let diceDOM = document.querySelector(".dice");
    // diceDOM.style.visibility = "visible";
    // diceDOM.src = `dice-${dice}.png`;

    let diceDOM_0 = document.getElementById("dice-0");
    diceDOM_0.style.visibility = "visible";
    diceDOM_0.src = `dice-${dices[0]}.png`;

    let diceDOM_1 = document.getElementById("dice-1");
    diceDOM_1.style.visibility = "visible";
    diceDOM_1.src = `dice-${dices[1]}.png`;

    // 3. Update the round score if the rolled number was not a 1
    if (dices[0] !== 1 && dices[1] !== 1) {
      if (dices[0] === dices[1] && dices[0] === 6) {
        nextPlayer();
      } else {
        // Add score
        roundScore += dices[0] + dices[1];
        document.querySelector(
          `#current-${activePlayer}`
        ).textContent = roundScore;
      }
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner";
      document.querySelectorAll(".dice").forEach((dice) => {
        dice.style.visibility = "hidden";
      });
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelectorAll(".dice").forEach((dice) => {
    dice.style.visibility = "hidden";
  });
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // getElementById is a bit faster than using querySelector
  document.querySelectorAll(".dice").forEach((dice) => {
    dice.style.visibility = "hidden";
  });

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  scoreInput = parseInt(document.getElementById("winning-score").value);
  if (!isNaN(scoreInput) && scoreInput > 0) {
    winningScore = scoreInput;
  } else {
    winningScore = 100;
  }
}

// document.querySelector(
//   `#current-${activePlayer}`
// ).innerHTML = `<em>${dice}</em>`;
// let x = document.querySelector("#score-0").textContent;
