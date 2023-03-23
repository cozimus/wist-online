const TableRow = ({ data, name }) => {
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
        <span
          className={
            "inf " +
            (data.find((column) => column.round === i).points ? "" : "prese")
          }
        >
          {data.find((column) => column.round === i).points ||
            data.find((column) => column.round === i).prese}
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
        <span
          className={
            "full " +
            (data.find((column) => column.round === 7).points ? "" : "prese")
          }
        >
          {data.find((column) => column.round === 7).points}
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
