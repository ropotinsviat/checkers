import { useState, useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import Board from "../components/Board";
import PlayerTable from "../components/PlayerTable";
import "../assets/css/game.css";

export default function GamePage() {
  const { socket } = useSocketContext();
  const [isWhite, setIsWhite] = useState(true);
  const [white, setWhite] = useState(null);
  const [black, setBlack] = useState(null);
  const [board, setBoard] = useState([[]]);
  const [turn, setTurn] = useState(true);
  const [movesInfo, setMovesInfo] = useState({ moves: [] });
  const [timeLimit, setTimeLimit] = useState(666);
  const inGame = !!(white && black);

  const setInfo = (data) => {
    console.dir(data, { depth: null });

    setBoard(data.board);
    setWhite(data.white);
    setBlack(data.black);
    setTimeLimit(data.timeLimit);
    setMovesInfo(data.movesInfo);
    setTurn(data.turn === 1);

    if (data.hasOwnProperty("aftermath")) {
      setWhite(null);
      setBlack(null);

      window.alert(data.aftermath);
      localStorage.removeItem("playerToken");
      // window.location.assign(window.location.origin);
    }
  };

  const surrender = () => {
    if (window.confirm("Are you sure you want to surrender?"))
      socket.emit("move", { surrender: true });
  };
  const proposeDraw = () => {
    socket.emit("move", { draw: true });
  };
  const makeMove = (i1, j1, i2, j2) =>
    socket.emit("move", {
      move: { from: [i1, j1], to: [i2, j2] },
    });

  useEffect(() => {
    if (socket) {
      socket.emit(
        "join",
        { playerToken: localStorage.getItem("playerToken") },
        (data) => {
          if (data && data.error) {
            localStorage.removeItem("playerToken");
            window.location.assign(window.location.origin);
          } else setIsWhite(data.isWhite);
        }
      );

      const handleDraw = (callback) => {
        if (window.confirm("Opponent has proposed a draw. Do you accept?"))
          callback(true);
      };
      const handlePlayAgain = (callback) => {
        if (window.confirm("Do you want to play again?")) callback(true);
        else callback(false);
      };
      const handleLeave = () => window.location.assign(window.location.origin);
      const handleGameData = (data) => setInfo(data);

      socket.on("getGameData", handleGameData);
      socket.on("draw", handleDraw);
      socket.on("playAgain", handlePlayAgain);
      socket.on("leave", handleLeave);

      return () => {
        socket.off("getGameData", handleGameData);
        socket.off("draw", handleDraw);
        socket.off("playAgain", handlePlayAgain);
        socket.off("leave", handleLeave);
      };
    }
  }, [socket]);

  return (
    <div className="felix">
      <Board
        board={board}
        setBoard={setBoard}
        turn={turn}
        movesInfo={movesInfo}
        isWhite={isWhite}
        makeMove={makeMove}
      />
      <div className="side-panel">
        <PlayerTable
          white={white}
          black={black}
          inGame={inGame}
          turn={turn}
          timeLimit={timeLimit}
          makeMove={makeMove}
        />
        {inGame && (
          <div className="button-bar">
            <div className="custom-btn same-wdth-btn">
              <input value="Surrender" onClick={surrender} type="button" />
            </div>
            <div className="custom-btn same-wdth-btn">
              <input
                value="Propose a draw"
                onClick={proposeDraw}
                type="button"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
