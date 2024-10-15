import { useState, useEffect } from "react";
import api from "../api.js";
import "../assets/css/history.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => format(new Date(date), "yyyy/MM/dd HH:mm");
const formatDateToYYYYMMDD = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function HistoryPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`${process.env.REACT_APP_SERVER_URL}/games`);
      res.data.games && setGames(res.data.games);
    })();
  }, []);

  function handleGameSimulationOpen(gameId) {
    navigate(`/simulation/${gameId}`);
  }

  return (
    <div className="container">
      {games.length < 1 ? (
        <div className="title">You have not completed any games yet</div>
      ) : (
        <div className="table-header">
          <div className="cell">#</div>
          <div className="cell">Players</div>
          <div className="cell">Result</div>
          <div className="cell">Moves</div>
          <div className="cell">Date</div>
        </div>
      )}
      {games.map((game, index) => (
        <div
          key={index}
          className="table-row game-el"
          onClick={() => handleGameSimulationOpen(game.game_id)}
        >
          <div className="cell">{index + 1}</div>
          <div className="cell palyers-box">
            <div className="fl">
              <span
                className={`color-box ${game.user_color ? "whbg" : "blbg"}`}
              ></span>
              <span className="myText">{game.user_name}</span>
            </div>
            <div className="fl">
              <span
                className={`color-box ${!game.user_color ? "whbg" : "blbg"}`}
              ></span>
              <span className="myText">{game.opponent_name}</span>
            </div>
          </div>
          <div className="cell">
            {game.winner_color
              ? "White won"
              : game.winner_color === 0
              ? "Black won"
              : "Draw"}
          </div>
          <div className="cell">{game.moves_count}</div>
          <div
            className="cell"
            title={`Started: ${formatDate(
              game.start_time
            )}\nFinished: ${formatDate(game.end_time)}`}
          >
            <div>{formatDateToYYYYMMDD(game.end_time)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
