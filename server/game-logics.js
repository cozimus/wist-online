import Deck from "./utils/deck.js";
import gameInfoTemplate from "./utils/gameInfoTemplate.js";

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
const waitingTime = process.env.NODE_ENV === "prodution" ? 2000 : 200;
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
  gamesData.push(gameInfo);
  return gameInfo;
}

function updateTurn(playedCard, playerId, roomId) {
  let gameInfo = gamesData.find((game) => game.roomId === roomId);
  //update player hand
  const dropIndex = gameInfo.players
    .find((player) => player.id === playerId)
    .playerHand.findIndex(
      (card) => card.value === playedCard.value && card.suit === playedCard.suit
    );
  gameInfo.players
    .find((player) => player.id === playerId)
    .playerHand.splice(dropIndex, 1);

  //update played cards
  gameInfo.playedCards.push(playedCard);

  if (gameInfo.playedCards.length == 1) {
    gameInfo.firstPlayedSuit = playedCard.suit;
  }

  //if the turn is not over let the next player play the card
  if (gameInfo.playedCards.length !== gameInfo.players.length) {
    gameInfo.playerTurn = (gameInfo.playerTurn + 1) % gameInfo.players.length;
  }

  gamesData.map((game) => (gameInfo.roomId === game.roomId ? gameInfo : game));
  return gameInfo;
}

async function endTurn(gameInfo) {
  await sleep(waitingTime);
  const winnerIndex = turnWinner(gameInfo);

  //save the last played cards
  gameInfo.lastPlayedCards = gameInfo.playedCards;

  //update the presa and the round Positions
  gameInfo.players.forEach((player) => {
    if (player.roundPosition === winnerIndex) player.prese += 1;
    player.roundPosition =
      (player.roundPosition - winnerIndex + gameInfo.players.length) %
      gameInfo.players.length;
  });

  //clear played cards and firstPlayedSuit, update playerTurn
  gameInfo.playedCards = [];
  gameInfo.firstPlayedSuit = "";
  gameInfo.playerTurn = 0;
  gameInfo.gameReady = true;
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
      player.roundPosition =
        (player.firstRoundPosition + gameInfo.round) % gameInfo.players.length;
    });
    gameInfo.lastPlayedCards = [];
    distributeCards(gameInfo.players.length, gameInfo);
  }
  if (gameInfo.round === 8) {
    //if the game is over remove the game from gamesData
    const index = gamesData.findIndex(
      (game) => game.roomId === gameInfo.roomId
    );
    if (index !== -1) {
      gamesData.splice(index, 1);
    }
  }
  return gameInfo.round;
}

function turnWinner(gameInfo) {
  let leadingSuit;
  if (
    gameInfo.playedCards.filter(
      (card) => card.suit === ROUND_BRISCOLA[gameInfo.round]
    ).length > 0
  ) {
    //c'è almeno una briscola
    leadingSuit = ROUND_BRISCOLA[gameInfo.round];
  } else {
    //non c'è neanche una briscola, comanda il primo seme giocato
    leadingSuit = gameInfo.playedCards[0].suit;
  }
  const valuesArray = gameInfo.playedCards.map((card) =>
    card.suit === leadingSuit ? CARD_VALUE_MAP[card.value] : 0
  );
  return valuesArray.indexOf(Math.max(...valuesArray));
}

function distributeCards(numberOfPlayers, gameInfo) {
  const deckSmallestValue = SMALLEST_CARD_MAP[numberOfPlayers];
  let deck = new Deck(deckSmallestValue);
  deck.shuffle();

  const startingCards = STARTING_CARDS_MAP[numberOfPlayers];

  gameInfo.players.forEach((player) => {
    player.playerHand = deck.startHand(startingCards);
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
    gameInfo.playerTurn = (gameInfo.playerTurn + 1) % gameInfo.players.length;
    valid = true;
  }

  gamesData.map((game) => (gameInfo.roomId === game.roomId ? gameInfo : game));
  return { gameInfo, valid };
}

function computePoints(gameInfo) {
  gameInfo.players.forEach((player) => {
    let newPoints;
    if (player.prese === player.call) {
      if (player.call === 0) {
        newPoints = 15;
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
      let startingPlayerIndex = gameInfo.players.find(
        (player) => player.id === gameInfo.laLeoCards[i].playerId
      ).firstRoundPosition;
      gameInfo.players[
        (startingPlayerIndex + 1) % gameInfo.players.length
      ].playerHand.push(...gameInfo.laLeoCards[i].cards);
    }
    gameInfo.laLeoCards = [];
  }
  gamesData.map((game) => (gameInfo.roomId === game.roomId ? gameInfo : game));
  return gameInfo;
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
