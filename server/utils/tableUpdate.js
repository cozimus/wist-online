import tableTemplate from "./tableTemplate.js";

function createPointsTable(gameInfo) {
  const pointsTable = [];
  gameInfo.players.forEach((player) => {
    pointsTable.push({
      playerName: player.playerName,
      playerId: player.id,
      callAndPoints: tableTemplate,
    });
  });
  return pointsTable;
}

function updateCallTable(gameInfo, playerId) {
  const newTable = gameInfo.pointsTable.map((playerRow) =>
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
  return newTable;
}

function updatePreseTable(gameInfo, playerId) {
  const newTable = gameInfo.pointsTable.map((playerRow) =>
    playerRow.playerId === playerId
      ? {
          ...playerRow,
          callAndPoints: playerRow.callAndPoints.map((data) =>
            data.round === gameInfo.round
              ? {
                  ...data,
                  prese: Number(data.prese) + 1,
                }
              : { ...data }
          ),
        }
      : { ...playerRow }
  );
  return newTable;
}

function updatePointsTable(gameInfo) {
  const newTable = gameInfo.pointsTable.map((playerRow) => ({
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
  return newTable;
}

export {
  createPointsTable,
  updateCallTable,
  updatePreseTable,
  updatePointsTable,
};
