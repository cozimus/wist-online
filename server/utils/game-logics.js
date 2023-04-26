import Deck from "./deck.js";
import gameInfoTemplate from "./gameInfoTemplate.js";
import { handleNewRecord } from "../controllers/recordController.js";
import {
  createPointsTable,
  updateCallTable,
  updatePreseTable,
  updatePointsTable,
} from "./tableUpdate.js";
const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
const ROUND_BRISCOLA = {
  0: "♥",
  1: "♦",
  2: "♣",
  3: "♠",
  4: "",
  5: "",
  6: "",
  7: "",
};
const SMALLEST_CARD_MAP = {
  //players: smallest card
  // 1: 10,
  2: 3,
  3: 9,
  4: 3,
  5: 5,
  6: 3,
};
const STARTING_CARDS_MAP = {
  //players: smallest card
  // 1: 10,
  2: 8,
  3: 8,
  4: 12,
  5: 8,
  6: 8,
};
const WIST_POINTS_MAP = {
  2: 50,
  3: 25,
  4: 25,
  5: 15,
  6: 15,
};
const waitingTime = process.env.NODE_ENV === "production" ? 2000 : 200;
console.log("waitingTime:", waitingTime);
console.log("Environment:", process.env.NODE_ENV);
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};
Array.prototype.sortHand = function () {
  let ordering = {}; // map for efficient lookup of sortIndex
  const sortOrder = ["♥", "♦", "♣", "♠"];
  for (let i = 0; i < sortOrder.length; i++) {
    ordering[sortOrder[i]] = i;
  }
  return this.sort(function (a, b) {
    return (
      ordering[a.suit] - ordering[b.suit] ||
      CARD_VALUE_MAP[a.value] - CARD_VALUE_MAP[b.value]
    );
  });
};

let gamesData = [];

function gameSetup(usersData) {
  let gameInfo = new gameInfoTemplate(usersData[0].roomId);
  const numberOfPlayers = usersData.length;

  const startingPositions = Array.from(Array(numberOfPlayers).keys());

  for (let i = startingPositions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [startingPositions[i], startingPositions[j]] = [
      startingPositions[j],
      startingPositions[i],
    ];
  }

  for (let i = 0; i < numberOfPlayers; i++) {
    gameInfo.players.push({
      playerName: usersData[i].userName,
      id: usersData[i].userId,
      prese: 0,
      playerHand: [],
      call: "",
      points: 0,
      firstRoundPosition: startingPositions[i],
      roundPosition: startingPositions[i],
    });
  }
  //ordina i players in base al firstRoundPosition
  gameInfo.players.sort((a, b) => a.firstRoundPosition - b.firstRoundPosition);

  distributeCards(numberOfPlayers, gameInfo);
  gameInfo.roomId = usersData[0].roomId;

  // remove a possible game with the same roomId and push the new one
  const index = gamesData.findIndex(
    (game) => game.roomId === usersData[0].roomId
  );
  if (index !== -1) {
    gamesData.splice(index, 1);
  }
  gameInfo.pointsTable = createPointsTable(gameInfo);
  gamesData.push(gameInfo);

  return gameInfo;
}

function updateTurn(playedCard, playerId, roomId) {
  let gameInfo = gamesData.find((game) => game.roomId === roomId);
  //if it's a valid play (the player didn't played a card yet) do the stuff
  if (!gameInfo.playedCards.find((element) => element.playerId === playerId)) {
    //update player hand
    const dropIndex = gameInfo.players
      .find((player) => player.id === playerId)
      .playerHand.findIndex(
        (card) =>
          card.value === playedCard.value && card.suit === playedCard.suit
      );
    gameInfo.players
      .find((player) => player.id === playerId)
      .playerHand.splice(dropIndex, 1);

    //update played cards
    gameInfo.playedCards.push({ card: playedCard, playerId: playerId });

    if (gameInfo.playedCards.length == 1) {
      gameInfo.firstPlayedSuit = playedCard.suit;
    }

    //if the turn is not over let the next player play the card
    if (gameInfo.playedCards.length !== gameInfo.players.length) {
      gameInfo.playerTurn = (gameInfo.playerTurn + 1).mod(
        gameInfo.players.length
      );
    }
  }

  gamesData.map((game) => (gameInfo.roomId === game.roomId ? gameInfo : game));
  return gameInfo;
}

async function endTurn(gameInfo) {
  await sleep(waitingTime);
  const winnerIndex = turnWinner(gameInfo);
  let winnerPlayerId;
  //save the last played cards
  gameInfo.lastPlayedCards = gameInfo.playedCards;

  //update the presa and the round Positions
  gameInfo.players.forEach((player) => {
    if (player.roundPosition === winnerIndex) {
      player.prese += 1;
      winnerPlayerId = player.id;
    }
    player.roundPosition = (
      player.roundPosition -
      winnerIndex +
      gameInfo.players.length
    ).mod(gameInfo.players.length);
  });

  //clear played cards and firstPlayedSuit, update playerTurn
  gameInfo.playedCards = [];
  gameInfo.firstPlayedSuit = "";
  gameInfo.playerTurn = 0;
  gameInfo.gameReady = true;
  gameInfo.pointsTable = updatePreseTable(gameInfo, winnerPlayerId);
  //check if the round is over
  if (
    gameInfo.players
      .map((player) => player.playerHand.length)
      .reduce((partialSum, a) => partialSum + a, 0) === 0
  ) {
    gameInfo = computePoints(gameInfo);
    gameInfo.round += 1;
    gameInfo.players.forEach((player) => {
      player.call = "";
      player.prese = 0;
      player.roundPosition = (
        player.firstRoundPosition +
        gameInfo.players.length -
        gameInfo.round
      ).mod(gameInfo.players.length);
      gameInfo.pointsTable = updatePointsTable(gameInfo);
    });
    gameInfo.lastPlayedCards = [];
    distributeCards(gameInfo.players.length, gameInfo);
  }

  if (gameInfo.round === 8) {
    handleGameOver(gameInfo);
  }
}

function turnWinner(gameInfo) {
  let leadingSuit;
  if (
    gameInfo.playedCards.filter(
      (element) => element.card.suit === ROUND_BRISCOLA[gameInfo.round]
    ).length > 0
  ) {
    //c'è almeno una briscola
    leadingSuit = ROUND_BRISCOLA[gameInfo.round];
  } else {
    //non c'è neanche una briscola, comanda il primo seme giocato
    leadingSuit = gameInfo.playedCards[0].card.suit;
  }
  const valuesArray = gameInfo.playedCards.map((element) =>
    element.card.suit === leadingSuit ? CARD_VALUE_MAP[element.card.value] : 0
  );
  return valuesArray.indexOf(Math.max(...valuesArray));
}

function distributeCards(numberOfPlayers, gameInfo) {
  const deckSmallestValue = SMALLEST_CARD_MAP[numberOfPlayers];
  let deck = new Deck(deckSmallestValue);
  deck.shuffle();

  const startingCards = STARTING_CARDS_MAP[numberOfPlayers];

  gameInfo.players.forEach((player) => {
    player.playerHand = deck.startHand(startingCards).sortHand();
    // player.playerHand = sortHand(player.playerHand);
  });
}

function updateCall(call, playerId, roomId) {
  let gameInfo = gamesData.find((game) => game.roomId === roomId);
  //check if is a valid call
  let valid = false;
  let callSum =
    gameInfo.players.reduce((partialSum, a) => partialSum + Number(a.call), 0) +
    call;
  let isLast =
    gameInfo.players.find((player) => player.id === playerId).roundPosition ===
    gameInfo.players.length - 1;
  if (!(callSum === STARTING_CARDS_MAP[gameInfo.players.length] && isLast)) {
    //update player call
    gameInfo.players.find((player) => player.id === playerId).call = call;
    gameInfo.playerTurn = (gameInfo.playerTurn + 1).mod(
      gameInfo.players.length
    );
    valid = true;
  }
  gameInfo.pointsTable = updateCallTable(gameInfo, playerId);
  gamesData.map((game) => (gameInfo.roomId === game.roomId ? gameInfo : game));
  return { gameInfo, valid };
}

function computePoints(gameInfo) {
  gameInfo.players.forEach((player) => {
    let newPoints;
    if (player.prese === player.call) {
      if (player.call === 0) {
        newPoints = WIST_POINTS_MAP[gameInfo.players.length];
      } else {
        newPoints = player.prese * player.prese + 10;
      }
    } else {
      if (player.call === 0) {
        newPoints = -5 * player.prese;
      } else {
        newPoints = player.prese;
      }
    }
    player.points += newPoints;
  });

  return gameInfo;
}

function checkCurrentGame(roomId) {
  return gamesData.find((game) => game.roomId === roomId);
}

function clearRoom(roomId) {
  const index = gamesData.findIndex((game) => game.roomId === roomId);
  if (index !== -1) {
    users.splice(index, 1);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleLaLeo(cards, playerId, roomId) {
  let gameInfo = gamesData.find((game) => game.roomId === roomId);
  gameInfo.laLeoCards.push({
    cards: cards,
    playerId: playerId,
  });

  //update player hand
  for (let i = 0; i < cards.length; i++) {
    const dropIndex = gameInfo.players
      .find((player) => player.id === playerId)
      .playerHand.findIndex(
        (handCard) =>
          handCard.value === cards[i].value && handCard.suit === cards[i].suit
      );
    gameInfo.players
      .find((player) => player.id === playerId)
      .playerHand.splice(dropIndex, 1);
  }

  if (gameInfo.laLeoCards.length === gameInfo.players.length) {
    for (let i = 0; i < gameInfo.laLeoCards.length; i++) {
      const startingPlayerIndex = gameInfo.players.find(
        (player) => player.id === gameInfo.laLeoCards[i].playerId
      ).firstRoundPosition;
      const playerIndex = (startingPlayerIndex + 1).mod(
        gameInfo.players.length
      );
      gameInfo.players[playerIndex].playerHand.push(
        ...gameInfo.laLeoCards[i].cards
      );
      gameInfo.players[playerIndex].playerHand.sortHand();
    }
    gameInfo.laLeoCards = [];
  }
  gamesData.map((game) => (gameInfo.roomId === game.roomId ? gameInfo : game));
  return gameInfo;
}

function handleGameOver(gameInfo) {
  gameInfo.pointsTable.forEach((element) => {
    handleNewRecord({
      playerName: element.playerName,
      callAndPoints: element.callAndPoints,
      players: gameInfo.pointsTable.length,
    });
  });

  //store the results in the DB
  //if the game is over remove the game from gamesData
  const index = gamesData.findIndex((game) => game.roomId === gameInfo.roomId);
  if (index !== -1) {
    gamesData.splice(index, 1);
  }
}

export {
  gameSetup,
  updateTurn,
  updateCall,
  checkCurrentGame,
  clearRoom,
  endTurn,
  handleLaLeo,
};
