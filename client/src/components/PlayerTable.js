import { useState, useEffect } from "react";

export default function PlayerTable({
  white,
  black,
  inGame,
  turn,
  timeLimit,
  makeMove,
}) {
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [whiteInterval, setWhiteInterval] = useState(null);
  const [blackInterval, setBlackInterval] = useState(null);

  useEffect(() => {
    setWhiteTime(white?.timer);
    setBlackTime(black?.timer);
    clearInterval(whiteInterval);
    clearInterval(blackInterval);

    const updateAndCheck = (prevTime) => {
      if (prevTime + 1 > timeLimit) {
        makeMove();
        clearInterval(whiteInterval);
        clearInterval(blackInterval);
      }
      return prevTime + 1;
    };

    if (inGame) {
      if (turn)
        setWhiteInterval(setInterval(() => setWhiteTime(updateAndCheck), 1000));
      else
        setBlackInterval(setInterval(() => setBlackTime(updateAndCheck), 1000));
    }
  }, [white, black]);

  function formattedTime(time) {
    if (typeof time !== "number") return;
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div>
      <div className={`player-table ${turn && "turn"}`}>
        <div className="circle-wrapper">
          <div className="wc"></div>
        </div>
        <div className="player-nametime-wrapper">
          <div className="pl-name">{white?.name}</div>
          <div>{`${formattedTime(whiteTime)}/${formattedTime(timeLimit)}`}</div>
        </div>
      </div>
      <div className={`player-table ${!turn && "turn"}`}>
        <div className="circle-wrapper">
          <div className="bc"></div>
        </div>
        <div className="player-nametime-wrapper">
          <div className="pl-name">{black?.name}</div>
          <div>{`${formattedTime(blackTime)}/${formattedTime(timeLimit)}`}</div>
        </div>
      </div>
    </div>
  );
}
