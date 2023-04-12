class gameInfoTemplate {
  constructor(roomId) {
    this.players = [];
    this.playedCards = [];
    this.roomId = roomId;
    this.round = 7;
    this.playerTurn = 0;
    this.firstPlayedSuit = "";
    this.lastPlayedCards = [];
    this.laLeoCards = [];
    this.gameReady = true;
  }
}

export default gameInfoTemplate;
