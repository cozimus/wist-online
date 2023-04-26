import TableRow from "./TableRow";

const tableHead = (
  <thead>
    <tr>
      <th>Nomi</th>
      <th className="suit red">♥</th>
      <th className="suit red">♦</th>
      <th className="suit black">♣</th>
      <th className="suit black">♠</th>
      <th>Libera</th>
      <th>LaLeo</th>
      <th>Buio</th>
      <th>Wist</th>
    </tr>
  </thead>
);
function ascSort(a, b) {
  return b.score - a.score;
}
function descSort(a, b) {
  return a.score - b.score;
}

function bestData(allData, players) {
  return allData
    .filter((game) => game.players === players)
    .sort(ascSort)
    .slice(0, 5);
}

function worstData(allData, players) {
  return allData
    .filter((game) => game.players === players)
    .sort(descSort)
    .slice(0, 5);
}

function tableFromData(filteredData) {
  return filteredData.length > 0 ? (
    <table className="table" cellSpacing="0">
      {tableHead}
      <tbody>
        {filteredData.map((player, index) => (
          <TableRow
            key={index}
            data={player.callAndPoints}
            name={player.playerName}
            currentRound={8}
          ></TableRow>
        ))}
      </tbody>
    </table>
  ) : (
    <div>
      <h3> No data found</h3>
    </div>
  );
}

function createTables(allData) {
  console.log(allData.filter((game) => game.players === 6).sort(ascSort));
  return {
    best2PTable: tableFromData(bestData(allData, 2)),
    best3PTable: tableFromData(bestData(allData, 3)),
    best4PTable: tableFromData(bestData(allData, 4)),
    best5PTable: tableFromData(bestData(allData, 5)),
    best6PTable: tableFromData(bestData(allData, 6)),
    worst2PTable: tableFromData(worstData(allData, 2)),
    worst3PTable: tableFromData(worstData(allData, 3)),
    worst4PTable: tableFromData(worstData(allData, 4)),
    worst5PTable: tableFromData(worstData(allData, 5)),
    worst6PTable: tableFromData(worstData(allData, 6)),
  };
}
export default createTables;
