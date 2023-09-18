module = (() => {
  "use strict";

  let deck = [];

  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];

  let playersPoints = [];

  // This function initializes the game

  const initingGame = (playersNum = 2) => {
    deck = createDeck();

    playersPoints = [];
    for (let i = 0; i < playersNum; i++) {
      playersPoints.push(0);
    }

    HTMLpoints.forEach((elem) => (elem.innerText = 0));
    divPlayersCards.forEach((elem) => (elem.innerHTML = ""));

    btnTakeCard.disabled = false;
    btnStop.disabled = false;
  };

  // HTML references

  const btnNewGame = document.querySelector("#btnNewGame"),
    btnTakeCard = document.querySelector("#btnTakeCard"),
    btnStop = document.querySelector("#btnStop");

  const divPlayersCards = document.querySelectorAll(".divCards"),
    HTMLpoints = document.querySelectorAll("small");

  // This function is to create a deck

  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }

    for (let type of types) {
      for (let spe of specials) {
        deck.push(spe + type);
      }
    }

    return _.shuffle(deck);
  };

  // This function allows you to take a card

  const takeCard = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    return deck.pop();
  };

  // This function is the value of the card

  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  // Turn: 0 is the first player and the last will be the computer
  // Cumulative Points

  const cumulativePoints = (card, turn) => {
    playersPoints[turn] = playersPoints[turn] + cardValue(card);
    HTMLpoints[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };

  // Insert a card

  const createCard = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("cards");
    divPlayersCards[turn].append(imgCard);
  };

  // Winner

  const determineWinner = () => {
    const [minimumPoints, computerPoints] = playersPoints;

    setTimeout(() => {
      if (computerPoints === minimumPoints) {
        alert("Iguales");
      } else if (minimumPoints > 21) {
        alert("Has perdido :[");
      } else if (computerPoints > 21) {
        alert("Has Ganado!");
      } else {
        alert("Has perdido :[");
      }
    }, 500);
  };

  // Computer turn

  const computerTurn = (minimumPoints) => {
    let computerPoints = 0;

    do {
      const card = takeCard();
      computerPoints = cumulativePoints(card, playersPoints.length - 1);
      createCard(card, playersPoints.length - 1);
    } while (computerPoints < minimumPoints && minimumPoints <= 21);

    determineWinner();
  };

  // Events

  btnTakeCard.addEventListener("click", () => {
    const card = takeCard();
    const playerPoints = cumulativePoints(card, 0);

    createCard(card, 0);

    if (playerPoints > 21) {
      console.warn("Has perdido");
      btnTakeCard.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    } else if (playerPoints === 21) {
      console.warn("21 Felicidades has ganado");
      btnTakeCard.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    }
  });

  // Stop Game

  btnStop.addEventListener("click", () => {
    btnTakeCard.disabled = true;
    btnStop.disabled = true;

    computerTurn(playersPoints[0]);
  });

  // New Game

  return {
    nuevoJuego: initingGame,
  };
})();
