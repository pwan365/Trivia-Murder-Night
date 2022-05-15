import React from "react";
import "./App.scss";

// components
import HomeCanvas from "./components/HomeCanvas/HomeCanvas";
import Tutorial from "./components/Tutorial/Tutorial";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { SocketContext, socket } from "./context/socket";
import GameRoom from "./components/GameRoom/GameRoom";
import GamePage from "./components/GamePage/GamePage";
import GameEnd from "./components/GameEnd/GameEnd";
import { StartGame } from "./components/StartGame/StartGame";
import WarningBar from "./components/WarningBar/WarningBar";
import BackDrop from "./components/BackDrop/BackDrop";

const App = () => {
  return (
    <div id="root">
      <div style={{ height: "100%" }}>
        <SocketContext.Provider value={socket}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/" element={<HomeCanvas />} />
              <Route path="/createGame" element={<StartGame />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/gameRoom" element={<GameRoom />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/gameEnd" element={<GameEnd />} />
              <Route path="*" element={<p>404 not found</p>} />
            </Routes>
            <WarningBar />
            <BackDrop />
          </BrowserRouter>
        </SocketContext.Provider>
      </div>
    </div>
  );
};

export default App;
