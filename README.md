## Introduction

Trivia Murder Night is a learning tool players can choose a selected topic and compete against each other to see who has the best knowledge. 

## Setup

### Prerequisite

Make sure you have Node.js v17 +

### Install dependencies

At the root directory, run

``npm install``

### Start the application

If you are using unix operating system, please run 

`` npm run start-unix ``

If you are using Windows or other, please run  

```` npm run start-prod ````

The application will start at http://localhost:3000/


### Testing

#### Testing frontend

`` npm run test-frontend ``

#### Testing backend

`` npm run test-backend ``


## How to play locally:

Once opens a room, you need to add multiple other tabs to join the room by input the room code to play. 

## Features:

- Multiplayer game, where the player count is 2 - 8
- Quiz with MCQ questions based on a selected topic with timer. 
- A ghost will chase the user starting at a specific round. 
- Room system which allows the users to create and join a room with their partners who learn/play the game together. 
- A user-friendly UI/UX to engage potential users.
- A tutorial section to help players learn the rules of the game.

## Meeting minutes

Please see [wiki](https://github.com/UOA-CS732-SE750-Students-2022/project-group-dandelion-ducks/wiki) for more detail.

## Tech Stacks used

[MongoDB](https://www.mongodb.com/)

[Express](https://expressjs.com/)

[ReactJS](https://reactjs.org/)

[Node](https://nodejs.org/en/)

[Socket.io](https://socket.io/)
