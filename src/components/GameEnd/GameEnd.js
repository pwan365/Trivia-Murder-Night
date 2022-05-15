import { Typography, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socket";

const GameEnd = () => {
  const socket = useContext(SocketContext);
  const { state } = useLocation();
  let navigate = useNavigate();
  const { winners, roomCode, players } = state;

  socket.on("clientRestart", (roomDetail) => {
    navigate(`/gameRoom`, { state: roomDetail });
  });

  function getWinners() {
    var str = "";

    for (var id in winners) {
      str = str + winners[id].playerName;
      str = "Congrats! " + str + " ";
    }
    if (str === "") {
      return "Oops! Looks like everyone is dead";
    }
    return str + "won!";
  }

  useEffect(() => {
    let playerArray = Object.entries(players).filter(
      ([key, value]) => value.id === socket.id
    );

    if (playerArray.length < 1) {
      navigate("/");
    }
  }, [players, navigate, socket.id]);

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h1" className="tutorial-title">
        {getWinners()}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          elevation={10}
          style={{
            background: "hotpink",
            width: "250px",
            height: "75px",
            fontSize: "30px",
            marginLeft: "5px",
            marginRight: "5px",
          }}
          onClick={() => {
            const RC = roomCode;
            socket.emit("Restart", RC);
          }}
        >
          Restart
        </Button>
        <Button
          variant="outlined"
          elevation={10}
          style={{
            background: "#252425",
            borderColor: "hotpink",
            borderWidth: "3px",
            width: "250px",
            height: "75px",
            fontSize: "30px",
            marginLeft: "5px",
            marginRight: "5px",
            color: "#fff",
          }}
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default GameEnd;
