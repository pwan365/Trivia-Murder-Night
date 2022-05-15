import { Typography, Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socket";

const GameEnd = () => {

  const socket = useContext(SocketContext);
  const { state } = useLocation();
  let navigate = useNavigate();
  const { winners } = state;
  const [players, setPlayers] = useState(winners);

 //   {detail.players.map((player) => {

  const restartGame = (correct) => {
      //alert(playerBoard[socket.id]);
      const RC = players[0].roomCode;
      navigate(`/gameRoom`);
      socket.emit("Restart");
  };

  socket.on("clientRestart", (roomDetail) => {
    navigate(`/gameRoom`, { state: roomDetail });
  })

  function getWinners() {
    var str = "";

    for (var id in players) {
        str = str + players[id].playerName;
        str = str + " ";
    }
    if (str == "") {
        return "Oops! Looks like everyone is dead";
    }
    return str + "won!";
  }

  return (
      <div>
          <Typography variant="h1" className="tutorial-title">{getWinners()}</Typography>
          <Button
              variant="contained"
              elevation={10}
              style={{ background: "hotpink", width: "300px", height: "50px" }}
              onClick={() => {
                const RC = players[0].roomCode;
                socket.emit("Restart", RC);
              }}
          >
              Restart
          </Button>
    </div>
  );
};

export default GameEnd;
