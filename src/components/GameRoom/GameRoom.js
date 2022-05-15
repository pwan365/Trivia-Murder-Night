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
import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    let playerArray = Object.entries(detail.players).filter(
      ([key, value]) => value.id === socket.id
    );

    if (playerArray.length < 1) {
      navigate("/");
    }
  }, [detail.players, navigate, socket.id]);

  return (
    <Container style={{ paddingTop: "100px", color: "white" }}>
      <Grid>
        <Card
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="h6">Room: {detail.code}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">
                Player: {detail.numberOfPlayer}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">
                Rounds: {detail.numberOfRounds}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Category: {detail.category}</Typography>
            </Grid>
          </Grid>
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
                  key={id}
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
