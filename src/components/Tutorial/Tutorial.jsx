import React from "react";
import { Typography } from "@mui/material";
import Img1 from "../../resources/img1.png";

const HomePara = () => {
    return (
        <div>
            <Typography variant="h1" className="tutorial-title">How to play the game?</Typography>
            <div className="tut-flex">
                <div className="tutorial-container">

                    <Typography variant="h4" className="tutorial-text">To join a game:</Typography>
                    <Typography variant="h5" className="tutorial-text">Scroll down in the home page to reveal the menu</Typography>
                    <Typography variant="h5" className="tutorial-text">Enter a room code to join a lobby</Typography>
                    <img className="tutorial-img" src={Img1} />
                    <Typography variant="h5" className="tutorial-text">Wait for the host to start the game</Typography>
                    <Typography variant="h5" className="tutorial-text">Progress the game by answering the questions</Typography>
                    <Typography variant="h5" className="tutorial-text">Try not to fall behind, if the ghost catches up to you, you're dead</Typography>
                    <Typography variant="h5" className="tutorial-text">Win the game by being the first to cross the line</Typography>
            
                </div>
                <div className="tutorial-container">

                    <Typography variant="h4" className="tutorial-text">To host a game:</Typography>
                    <Typography variant="h5" className="tutorial-text">Click "New Room" from the home page</Typography>
                    <img className="tutorial-img" src={Img1} />
                    <Typography variant="h5" className="tutorial-text">Select the number of players, rounds, and a category of questions to play for</Typography>
                    <Typography variant="h5" className="tutorial-text">Share the room code with your friends for them to join</Typography>
                    <Typography variant="h5" className="tutorial-text">Start the game when everyone is ready</Typography>
            
                </div>
            </div>
        </div>
    );
};

export default HomePara;
