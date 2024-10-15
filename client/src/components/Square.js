const piece = ["", "wc", "bc", "wc wl", "bc bl", "pssM", "pssA", "slctd"];

export default function Square({
  columnIndex,
  rowIndex,
  checker,
  selectedCell,
  cellClicked,
}) {
  return (
    <div
      className={`cell ${(rowIndex + columnIndex) % 2 ? "brown" : "white"} ${
        selectedCell[0] === rowIndex && selectedCell[1] === columnIndex
          ? " Y"
          : ""
      }
  ${
    typeof checker === "string"
      ? checker
      : checker
      ? checker.color
        ? piece[1 + (checker.king ? 2 : 0)]
        : piece[2 + (checker.king ? 2 : 0)]
      : ""
  }`}
      onClick={() => cellClicked(rowIndex, columnIndex)}
    ></div>
  );
}
