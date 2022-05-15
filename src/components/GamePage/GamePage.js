import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socket";
import RacingTrack from "../RacingTrack/RacingTrack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GamePage = () => {
  const { state } = useLocation();
  const { player, question, roomCode, numberOfRounds } = state;
  const socket = useContext(SocketContext);
  let navigate = useNavigate();

  const [playerStatus, setPlayerStatus] = useState(player);
  const [quiz, setQuiz] = useState(question);
  const [openModal, setOpenModal] = useState(false);
  const [openRoundEndModal, setOpenRoundEndModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secs, setSeconds] = useState(10);
  const [ghostPos, setGhostPos] = useState(0);

  useEffect(() => {
    if (!(socket.id in playerStatus)) {
      navigate("/");
    }
  }, [navigate, playerStatus, playerStatus.id, socket.id]);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        const timerUp = () => {
          socket.emit("playerFinished", false, roomCode);
          toggleRoundEndModal();
        };
        timerUp();
        setSeconds("Finished");
        clearInterval(sampleInterval);
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const toggleRoundEndModal = () => {
    setOpenRoundEndModal(!openRoundEndModal);
  };

  const answerQuestion = (correct) => {
    socket.emit("playerFinished", correct, roomCode);
    setSeconds("Finished");
    toggleRoundEndModal();
  };

  const toggleLoading = () => {
    setLoading(!loading);
  };

  socket.on("roundFinished", (playerPosition) => {
    toggleRoundEndModal();
    setPlayerStatus(playerPosition);
    toggleModal();
  });

  socket.on("startRound", (question) => {
    toggleLoading();
    toggleModal();
    setSeconds(10);

    setQuiz(question);
  });

  socket.on("gameFinished", (winners) => {
    navigate("/gameEnd", {
      state: {
        winners: winners,
        roomCode: roomCode,
        players: playerStatus,
      },
    });
  });

  socket.on("ghostPos", (ghostPosition) => {
    setGhostPos(ghostPosition);
  });

  socket.on("gameDisconnect", () => {
    navigate("/");
  });

  return (
    <div style={{ height: "fit-content" }}>
      <Container style={{ marginTop: "64px", color: "white" }}>
        <Grid>
          <RacingTrack
            playerStatus={playerStatus}
            ghostPos={ghostPos}
            numberOfRounds={numberOfRounds}
          />
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              margin: "36px",
            }}
          >
            <Grid>
              <Card
                style={{
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "100px",
                }}
              >
                <Typography variant="h3">{secs}</Typography>
              </Card>
            </Grid>
          </div>
          <Card elevation={10} style={{ marginBottom: "24px" }}>
            <CardContent>
              <Typography variant="h4" style={{ textAlign: "center" }}>
                {quiz.name}
              </Typography>
            </CardContent>
          </Card>
          <Grid container spacing={2} style={{ marginBottom: "24px" }}>
            {quiz.answers.map((answer) => {
              return (
                <Grid item xs={6}>
                  <Card>
                    <Button
                      style={{ width: "100%" }}
                      onClick={() => answerQuestion(answer.correct)}
                    >
                      <CardContent>
                        <Typography>{answer.context}</Typography>
                      </CardContent>
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        open={openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {loading
                ? "Click next when you ready for next round!"
                : "Wait for everyone to finish"}
            </Typography>

            {loading ? (
              <CircularProgress style={{ width: "30px" }} />
            ) : (
              <Button
                id="transition-modal-description"
                sx={{ mt: 2 }}
                onClick={() => {
                  socket.emit("newRound", roomCode);
                  toggleLoading();
                }}
              >
                Next Round
              </Button>
            )}
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        open={openRoundEndModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRoundEndModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Wait till all players have finished
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default GamePage;
