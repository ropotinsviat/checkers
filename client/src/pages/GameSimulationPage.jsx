import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";
import PlayerTable from "../components/PlayerTable";
import api from "../api";
import initialBoard from "../initial-board";

export default function GameSimulationPage() {
  const [white, setWhite] = useState(null);
  const [black, setBlack] = useState(null);
  const [board, setBoard] = useState([[]]);
  const [turn, setTurn] = useState(true);
  const [timeLimit, setTimeLimit] = useState(666);

  const gameData = useRef();
  const moves = useRef([]);
  const curI = useRef();

  const { gameId } = useParams();

  function setGame() {
    const newBoard = initialBoard();
    let whTm = 0,
      blTm = 0,
      lastTs = gameData.current.start_time;

    for (let i = 0; i <= curI.current; i++) {
      const from = moves.current[i].from_square;
      const to = moves.current[i].to_square;

      const takenTime =
        (new Date(moves.current[i].move_time) - new Date(lastTs)) / 1000;

      if (moves.current[i].color) whTm += takenTime;
      else blTm += takenTime;

      lastTs = moves.current[i].move_time;

      newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]];

      if (to[0] == 0 && newBoard[to[0]][to[1]].color)
        newBoard[to[0]][to[1]].king = true;
      if (to[0] == 7 && !newBoard[to[0]][to[1]].color)
        newBoard[to[0]][to[1]].king = true;

      const xDiff = to[0] > from[0] ? 1 : -1;
      const yDiff = to[1] > from[1] ? 1 : -1;

      let x = Number(from[0]);
      let y = Number(from[1]);
      while (x !== Number(to[0])) {
        newBoard[x][y] = null;
        x += xDiff;
        y += yDiff;
      }
    }

    setTurn(
      moves.current[Math.min(curI.current + 1, moves.current.length - 1)]
        .color === 1
    );
    console.log(whTm);
    console.log(blTm);
    setWhite({ name: gameData.current.player1_name, timer: whTm });
    setBlack({ name: gameData.current.player2_name, timer: blTm });
    setBoard(newBoard);
  }

  function handlePrev() {
    if (curI.current >= 0) {
      curI.current--;
      setGame();
    }
  }
  function handleNext() {
    if (curI.current < moves.current.length - 1) {
      curI.current++;
      setGame();

      if (curI.current === moves.current.length - 1)
        setTimeout(
          () =>
            alert(
              gameData.current.winner_color
                ? "White won the match!"
                : gameData.current.winner_color === 0
                ? "Black won the match!"
                : "Draw"
            ),
          500
        );
    }
  }

  useEffect(() => {
    (async () => {
      const {
        data: { completeGameData },
      } = await api.get(`game/${gameId}`);
      console.log(completeGameData);
      setWhite({ name: completeGameData.gameData.player1_name, timer: 0 });
      setBlack({ name: completeGameData.gameData.player2_name, timer: 0 });
      setTimeLimit(completeGameData.gameData.time_limit);
      setBoard(initialBoard());
      setTurn(true);
      curI.current = -1;
      moves.current = completeGameData.moves;
      gameData.current = completeGameData.gameData;
    })();
  }, []);

  return (
    <>
      <div className="felix">
        <Board
          board={board}
          setBoard={setBoard}
          turn={turn}
          movesInfo={{ moves: [] }}
          isWhite={true}
        />
        <div className="side-panel">
          <PlayerTable
            white={white}
            black={black}
            inGame={false}
            turn={turn}
            timeLimit={timeLimit}
            isWhite={true}
          />
          <div className="button-bar">
            <div
              className={`custom-btn same-wdth-btn ${
                curI.current < 0 && "hide"
              }`}
            >
              <input value="Prev" type="button" onClick={handlePrev} />
            </div>
            <div
              className={`custom-btn same-wdth-btn ${
                curI.current === moves.current.length - 1 && "hide"
              }`}
            >
              <input value="Next" type="button" onClick={handleNext} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
