const TableRow = ({ data, name, currentRound }) => {
  const column = [];
  for (let i = 0; i < 7; i++) {
    column.push(
      <td className="diagonal" key={i}>
        <span
          className={
            "sup " +
            (data.find((column) => column.round === i).guessed
              ? "guessed"
              : data.find((column) => column.round === i).guessed === false
              ? "wrong"
              : "")
          }
        >
          {data.find((column) => column.round === i).call}
        </span>
        <span className={"inf " + (currentRound === i ? "prese" : "")}>
          {currentRound === i
            ? data.find((column) => column.round === i).prese
            : data.find((column) => column.round === i).points}
        </span>
      </td>
    );
  }
  return (
    <tr>
      <td>
        <span className="full name">{name}</span>
      </td>
      {column}
      <td>
        <span className={"full " + (currentRound === 7 ? "prese" : "")}>
          {currentRound === 7
            ? data.find((column) => column.round === 7).prese
            : data.find((column) => column.round === 7).points}
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
