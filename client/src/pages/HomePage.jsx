import { useSocketContext } from "../context/SocketContext";
import { useState, useEffect } from "react";
import "../assets/css/home.css";
import { ReactComponent as PlayIcon } from "../assets/svg/play.svg";
import Board from "../components/Board";
import initialBoard from "../initial-board";

export default function HomePage() {
  const [board, setBoard] = useState(() => initialBoard());

  const { socket, reconnectSocket } = useSocketContext();
  const [mode, setMode] = useState();

  useEffect(() => setBoard(initialBoard()), [mode]);

  function playOnline() {
    socket.emit("playOnline");
    setMode(1);
  }

  function cancel() {
    reconnectSocket();
    setMode();
  }

  return (
    <main>
      {mode ? (
        <div className="ideal-center">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>Waiting for an opponent...</div>
          <div className="custom-btn">
            <input value="Cancel" type="button" onClick={cancel} />
          </div>
        </div>
      ) : (
        <div className="home">
          <div>
            <div>
              <div>Play checkers with other players!</div>
              <div>
                {/* Board 8x8; Can capture backwards; King long moves possible; Must
                capture max pieces */}
                <div>- Board 8x8</div>
                <div>- Can capture backwards</div>
                <div>- King long moves possible</div>
                <div>- Must capture max pieces</div>
              </div>
            </div>
            <button onClick={playOnline}>
              <PlayIcon />
              Play online
            </button>
          </div>
          <Board
            board={board}
            setBoard={setBoard}
            movesInfo={{ moves: [] }}
            isWhite={true}
          />
        </div>
      )}
    </main>
  );
}
