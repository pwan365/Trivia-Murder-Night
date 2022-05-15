import { io, Socket } from "socket.io-client";

var socket;
socket = io("http://localhost:5000");

var playerAlive = true;

socket.on("confirm", confirmJoinRoom);
socket.on("roomCode", handleRoomCode);
socket.on("initGame", handleInit);
socket.on("startGame", handleStartGame);
socket.on("startRound", handleStartRound);
socket.on("gameFinished", handleGameFinished);
socket.on("roundFinished", handleRoundFinished);
socket.on("roundResult", handleRoundResult);
socket.on("errorMessage", handleErrorMessage);
socket.on("newComer", handleHi);
socket.on("ghostPos", handleGhost);
socket.on("youDied", handleDie);

function confirmJoinRoom(arg) {
  console.log("in room " + arg);
}

function handleRoomCode(code) {
  console.log(code);
}

function handleGameFinished() {
  console.log("IT's Done");
  // show who's the winner juding by the position board
}

function handleRoundFinished(newPosition) {
  console.log(newPosition);
  // update board, update shadow
  // pop up a modal to make sure player click a button, to continue to the next round
  // each person emits newROUND
}

function handleStartGame(playerPosition, question) {
  console.log("3 2 1 START");
  console.log(playerPosition);
  // redirect all clients to the main game page,
  // start timer and show question,
}

function handleStartRound() {
  // pop up new question
}

function onClickButtonOrTimerRunTimer() {
  // after they finish (either answer or timer run out), emit playerFinished
  socket.emit("playerFinished", true, "roomCode");
}

function handleHi(room) {
  console.log(room);
}

function handleInit() {
  /**
   * TODO: Implement Init()
   * Include: Fetch data from API.
   *
   */
  console.log("game init");
}

function handleRoundResult(roundScore) {
  console.log(roundScore);
}

function handleErrorMessage(err) {
  console.log(err);
}

/**
 * Below are DOM needed functions
 */

function callback(roomCode) {
  socket.emit("joinRoom", roomCode);
}

function createNewRoom() {
  socket.emit("newRoom");
  // TODO: Implement New Room button in the frontend.
}

function makeChooseCorrect(score) {
  socket.emit("answerTrue", score);
}

function makeChooseWrong() {
  socket.emit("answerFalse");
}

/**
 * When the timer for a round stops
 */
function oneRoundEnds(houseCode) {
  socket.emit("roundEnd", houseCode);
}

function handleGhost(ghostPos) {
  // TODO: Implement ghost chase screen.
}

function handleDie() {
  // TODO: Implement die screen.
}

socket.emit("newRoom", {
  numberOfPlayer: 3,
  numberOfRounds: 10,
});

// socket.emit("joinRoom", "k7vKf");

// socket.emit("newGame", "k7vKf");

// socket.emit("playerFinished", true, roomCode); // correct or not
