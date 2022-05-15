import mongoose from "mongoose";
import express from "express";
import { categories, questions, answers } from "./example-data";

import { Answer } from "./schemas/Answer.schema";
import { Question } from "./schemas/Question.schema";
import { Category } from "./schemas/Category.schema";
import * as Service from "./schemas/Service";
import cors from 'cors';

const app = express();
app.use(cors({credentials: true, origin: true}));
const port = 4200;

// app.use(express.json());

// import routes from './routes';
// app.use('/', routes);

connectDb().then(() =>
  app.listen(port, () => console.log(`App server listening on port ${port}!`))
);


function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;

async function connectDb(){
    await mongoose.connect("mongodb://127.0.0.1:27017/game");
    mongoose.connection.collections['categoryschemas'].drop( function(err) {
        console.log('categoryschema dropped');
    });mongoose.connection.collections['answers'].drop( function(err) {
        console.log('answers dropped');
    });
    mongoose.connection.collections['questions'].drop( function(err) {
        console.log('questions dropped');
    });
    mongoose.connection.collections['programs'].drop( function(err) {
        console.log('programs dropped');
    });
    console.log("Connected");
    await addExampleData();
}
  
  
async function addExampleData() {
  for (let i = 0; i < categories.length; i++) {
    let ques = [];
    for (let j = 0; j < questions[i].length; j++) {
      let answs = [];
      for (let z = 0; z < answers[i][j].length; z++) {
        const dbAnsw = new Answer({
          context: answers[i][j][z][0],
          correct: answers[i][j][z][1],
        });
        answs.push(dbAnsw);
        await dbAnsw.save();
      }
      const dbQues = new Question({ name: questions[i][j], answers: answs });
      ques.push(dbQues);
      await dbQues.save();
    }
    const dbCate = new Category({ name: categories[i], questions: ques });
    await dbCate.save();
  }
}

const rooms = {};

const state = {}; // Measure the score;

// Socket.io
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
}); //in case server and client run on different urls

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);
  socket.on("disconnect", handleDisconnect); // Done
  socket.on("joinRoom", handleJoinRoom); // Done
  socket.on("newRoom", handleNewRoom); // Done
  socket.on("newGame", handleNewGame); // Done
  socket.on("newRound", handleNewRound); // Done
  socket.on("playerFinished", handlePlayerFinished); // Done
  socket.on("Restart", handleRestart);

  // DONE
  async function handleJoinRoom(RC) {
    if (RC in rooms) {
      if (rooms[RC].started) {
        socket.emit("errorMessage", "This game has already started!!");
        return;
      }

      if (rooms[RC].numberOfPlayer === rooms[RC].playerCount) {
        socket.emit("errorMessage", "This game is full!!");
        return;
      }

      socket.join(RC);
      pushPlayer(RC);
      // state[socket.id] = [RC, 0];
      console.log("socket " + socket.id + " joined room " + RC);
      // rooms[RC].players.push(socket.id);
      io.sockets.in(RC).emit("newComer", rooms[RC]);
      socket.emit("confirm", rooms[RC]);
    } else {
      socket.emit("errorMessage", "Wrong CODE!");
    }
  }

  function handleDisconnect(reason) {
    console.log(reason);
  }

  function handlePlayerFinished(result, RC) {
    if (result) rooms[RC].players[socket.id].position++;
    rooms[RC].numberOfDone++;
    if (
      rooms[RC].players[socket.id].alive &&
      rooms[RC].players[socket.id].position <= rooms[RC].ghostRound &&
      rooms[RC].ghostRound != 0
    ) {
      rooms[RC].players[socket.id].alive = false;
        socket.emit("youDied");
        console.log("someone died");
    }
    if (rooms[RC].numberOfDone === rooms[RC].numberOfPlayer) {
      //console.log("Round Finished");
      rooms[RC].numberOfDone = 0;
      rooms[RC].currentRound++;

      var wonPlayers = [];

    var wonPlayers = [];
    var liveCount = 0;

    Object.entries(rooms[RC].players).map(([id, player]) => {
        if (player.position == rooms[RC].numberOfRounds) {
          wonPlayers.push(player);
        }
        if (player.alive) {
            liveCount++;
        }
    });

    console.log(rooms[RC].currentRound);
        console.log(rooms[RC].players);
        console.log("ghost at " +rooms[RC].ghostRound);
    

        if (liveCount == 0) {
            io.sockets.in(RC).emit("gameFinished", []);
        }else if (wonPlayers.length != 0) {
            io.sockets.in(RC).emit("gameFinished", wonPlayers);
        } else {
            io.sockets.in(RC).emit("roundFinished", rooms[RC].players);
        }
    }
  }

  function handleRestart(RC) {
    cleanRoom(RC);
    io.sockets.in(RC).emit("clientRestart", rooms[RC]);
  }

  function cleanRoom(RC) {
    rooms[RC].answeredQuestions = [];
    for (var key in rooms[RC].players) {
      rooms[RC].players[key].position = 0;
      rooms[RC].players[key].alive = true;
    }
    rooms[RC].numberOfDone = 0;
    rooms[RC].currentRound = 1;
    rooms[RC].ghostRound = 0;
  }

  async function handleNewGame(RC) {
    /*
    let newPlayerLocations = {};
    let newPlayerLive = {};
    for (let player of rooms[RC].players) {
      newPlayerLocations[player.id] = 0;
      newPlayerLive[player.id] = true;
    }
    playerPosition[RC] = newPlayerLocations;
    playerLive[RC] = newPlayerLive;
    */
    let quest = await getQuest(RC);
    //console.log("nnnnnnnnnnnnnnnnn");
    //console.log(newPlayerLocations);
    //console.log(playerPosition[0]);
    io.sockets.in(RC).emit("startGame", rooms[RC].players, quest); // SEND NEW QUESTION AS THE SECOND OBJECT
  }

  async function handleNewRound(RC) {
    // wait for all player to emit
    rooms[RC].numberOfDone++;
    if (rooms[RC].numberOfDone === rooms[RC].numberOfPlayer) {
      rooms[RC].numberOfDone = 0;
      let quest = await getQuest(RC);
      io.sockets.in(RC).emit("startRound", quest); // SEND NEW QUESTION AS THE SECOND OBJECT

      if (rooms[RC].currentRound > rooms[RC].numberOfRounds / 2) {
        rooms[RC].ghostRound += 1;
        io.to(RC).emit("ghostPos", rooms[RC].ghostRound);
      }
    }
  }

  function handleNewRoom(roomConfig) {
    const code = makeid(5);
    rooms[code] = {
      numberOfPlayer: roomConfig.numberOfPlayer,
      numberOfRounds: roomConfig.numberOfRounds,
      answeredQuestions: [],
      players: {},
      playerCount: 0,
      owner: socket.id,
      category: roomConfig.category,
      code: code,
      numberOfDone: 0,
      currentRound: 1,
      ghostRound: 0,
    };
    //console.log(code);
    //console.log(rooms[code]);
    pushPlayer(code);
    socket.join(code);
    socket.emit("roomCode", rooms[code]);
  }

  async function getQuest(RC) {
    var question, id;
    while (true) {
      question = await Service.findRandomQuestionOfCategory(rooms[RC].category);
      id = question._id.toString();
      if (!rooms[RC].answeredQuestions.includes(id)) {
        // uncomment when there is more question
        //rooms[roomID].answeredQuestions.push(id);
        break;
      }
    }
    return question;
    //io.to(roomID).emit("quest", question);
  }

  function pushPlayer(RC) {
    let player = {
      id: "",
      playerName: "",
      position: 0,
      alive: true,
      roomCode: RC,
    };

    var length = 1;
    for (var count in rooms[RC].players) {
      length++;
    }
    player.id = socket.id;
    player.playerName = "player" + length.toString();
    rooms[RC].players[player.id] = player;
    rooms[RC].playerCount++;
  }
});

server.listen(PORT, (err) => {
  console.log("SocketIO Server running on Port ", PORT);
});
