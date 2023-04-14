import TableTemplate from "./TableTemplate.js";

function createPointsTable(gameInfo) {
  const pointsTable = [];
  gameInfo.players.forEach((player) => {
    pointsTable.push({
      playerName: player.playerName,
      playerId: player.id,
      callAndPoints: TableTemplate,
    });
  });
  return pointsTable;
}

function updateCallTable(pointsTable, gameInfo, playerId) {
  return pointsTable.map((playerRow) =>
    playerRow.playerId === playerId
      ? {
          ...playerRow,
          callAndPoints: playerRow.callAndPoints.map((data) =>
            data.round === gameInfo.round
              ? {
                  ...data,
                  call: gameInfo.players.find(
                    (player) => player.id === playerId
                  ).call,
                }
              : { ...data }
          ),
        }
      : { ...playerRow }
  );
}

function updatePreseTable(pointsTable, gameInfo) {
  return pointsTable.map((playerRow) => ({
    ...playerRow,
    callAndPoints: playerRow.callAndPoints.map((data) =>
      data.round === gameInfo.round
        ? {
            ...data,
            prese: gameInfo.players.find(
              (player) => player.id === playerRow.playerId
            ).prese,
          }
        : { ...data }
    ),
  }));
}

function updatePointsTable(pointsTable, gameInfo) {
  return pointsTable.map((playerRow) => ({
    ...playerRow,
    callAndPoints: playerRow.callAndPoints.map((data) =>
      data.round === gameInfo.round - 1
        ? {
            ...data,
            points: gameInfo.players.find(
              (player) => player.id === playerRow.playerId
            ).points,
            guessed:
              gameInfo.players.find(
                (player) => player.id === playerRow.playerId
              ).points >=
              (playerRow.callAndPoints.find(
                (column) => column.round === data.round - 1
              )
                ? playerRow.callAndPoints.find(
                    (column) => column.round === data.round - 1
                  ).points + 11
                : 11),
          }
        : { ...data }
    ),
  }));
}

export {
  createPointsTable,
  updateCallTable,
  updatePreseTable,
  updatePointsTable,
};
