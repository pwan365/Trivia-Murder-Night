import React from "react";
import { create } from "react-test-renderer";
import RacingTrack from "../RacingTrack/RacingTrack";

var playerStatus = {
  id: "4hTFDMJN4tz4So_MAAAL",
  playerName: "player2",
  position: 0,
  roomCode: "K8DYu",
};

const racingTrack = create(
  <RacingTrack playerStatus={playerStatus} ghostPos={0} numberOfRounds={5} />
);

test("raceSnapshot", () => {
  expect(racingTrack).toMatchSnapshot();
});
