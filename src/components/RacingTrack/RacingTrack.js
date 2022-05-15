import { Grid } from "@mui/material";
import React from "react";
import DuckIcon from "../../resources/duck.png";
import GhostIcon from "../../resources/ghost.png";

const RacingTrack = (props) => {
  return (
    <div>
      {Object.entries(props.playerStatus).map(([key, value]) => {
        return (
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: "10px", width: "100px" }}>
              {value.playerName}
            </p>
            {value.alive ? (
              <div
                className="player-board"
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: `repeat(${props.numberOfRounds}, 1fr)`,
                }}
              >
                {props.ghostPos !== 0 && (
                  <Grid
                    className="position-ghost"
                    style={{
                      gridColumnStart: props.ghostPos,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        fill: "white",
                      }}
                      src={GhostIcon}
                      alt="ghost"
                    />
                  </Grid>
                )}
                <div
                  className="position-player"
                  style={{
                    gridColumnStart: value.position + 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      transition: "all 2s ease",
                    }}
                    src={DuckIcon}
                    alt="duck"
                  />
                </div>
                <p
                  style={{
                    gridColumnStart: 10,
                    transition: "all 2s ease",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  GOAL
                </p>
              </div>
            ) : (
              <p style={{ color: "red" }}>DIED</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RacingTrack;
