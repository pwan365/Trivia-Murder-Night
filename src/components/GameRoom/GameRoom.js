import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { SocketContext } from "../../context/socket";

const GameRoom = () => {
  const socket = useContext(SocketContext);
  const { state } = useLocation();
  let navigate = useNavigate();

  const [detail, setDetail] = useState(state);

  const updateDetail = (newDetail) => {
    setDetail(newDetail);
  };

  socket.on("newComer", (roomDetail) => {
    updateDetail(roomDetail);
  });

  socket.on("startGame", (player, question) => {
    navigate("/game", {
      state: {
        player: player,
        question: question,
        roomCode: detail.code,
        numberOfRounds: detail.numberOfRounds,
      },
    });
  });

  console.log(state);
  return (
    <Container style={{ marginTop: "100px", color: "white" }}>
      <Grid>
        <Card
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h5">Room: {detail.code}</Typography>
          <Typography variant="h5">Player: {detail.numberOfPlayer}</Typography>
          <Typography variant="h5">Rounds: {detail.numberOfRounds}</Typography>
          <Typography variant="h5">Category: {detail.category}</Typography>
        </Card>
        <Card>
          <CardContent elevation={10}>
            {Object.entries(detail.players).map(([id, player]) => {
              return (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EmojiEmotionsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={player.playerName} />
                  </ListItem>
                </List>
              );
            })}
            <Divider />
            {socket.id === detail.owner && (
              <Button
                variant="contained"
                style={{
                  float: "right",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                disabled={detail.numberOfPlayer !== detail.playerCount}
                onClick={() => socket.emit("newGame", detail.code)}
              >
                Start
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default GameRoom;
