import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../context/socket";
import { useNavigate } from "react-router-dom";

const players = [2, 3, 4, 5, 6, 7, 8];
var rounds = [1, 2, 3, 4, 5, 6, 7, 8];

export const StartGame = () => {
  const [category, setCategory] = useState([]);
  const socket = useContext(SocketContext);
  let navigate = useNavigate();

  const [RC, setRC] = useState("");

  const joinRoom = () => {
    socket.emit("joinRoom", RC);
  };

  const createNewRoom = () => {
    var category = document.getElementById("categorySelect");
    var player = document.getElementById("playerSelect");
    var round = document.getElementById("roundSelect");

    socket.emit("newRoom", {
      numberOfPlayer: parseInt(player.options[player.selectedIndex].value),
      numberOfRounds: parseInt(round.options[round.selectedIndex].value),
      category: category.options[category.selectedIndex].value,
    });
  };

  const updateRoomCode = (event) => {
    event.preventDefault();
    setRC(event.target.value);
  };

  useEffect(() => {
    async function getCategories() {
      const response = await fetch(
        "http://localhost:4200/api/services/categories"
      ).then((resp) => resp.json());
      setCategory(response);
    }
    getCategories();
  }, []);

  socket.on("confirm", (roomDetail) => {
    navigate(`/gameRoom`, { state: roomDetail });
  });

  socket.on("roomCode", (roomCode) => {
    navigate(`/gameRoom`, { state: roomCode });
  });

  return (
    <>
      <div className="overlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modalContainer"
        >
          <div className="modalRight">
            <p className="closeBtn" onClick={() => navigate("/")}>
              X
            </p>
            <div className="content" style={{ maxWidth: "80vw" }}>
              <div className="createGame">
                <h3 className="banner">Create Game</h3>

                <label>Select a Category:</label>
                <select
                  className="dropDown"
                  name="category"
                  id="categorySelect"
                >
                  {category.map((c) => (
                    <option key={c.name}>{c.name}</option>
                  ))}
                </select>
                <hr></hr>

                <label>Select Number of Players:</label>
                <br></br>
                <select className="dropDown" name="player" id="playerSelect">
                  {players.map((player) => (
                    <option key={player}>{player}</option>
                  ))}
                </select>

                <hr></hr>

                <label>Choose Number of Rounds:</label>
                <br></br>
                <select className="dropDown" name="round" id="roundSelect">
                  {rounds.map((round) => (
                    <option key={round}>{round}</option>
                  ))}
                </select>
                <br></br>
                <button className="button" onClick={createNewRoom}>
                  Start Game!
                </button>
              </div>

              <div className="joinGame">
                <h3>Join Game</h3>
                <p>Enter Code:</p>
                <input value={RC} onChange={updateRoomCode}></input>
                <button className="button" onClick={joinRoom}>
                  Join!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
