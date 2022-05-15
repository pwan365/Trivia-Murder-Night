import React from "react";
import DuckIcon from "../../resources/duck.png";

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
                  gridTemplateColumns: `repeat(10, 1fr)`,
                  transition: "all 2s ease",
                }}
              >
                {props.ghostPos !== 0 && (
                  <div
                    className="position-ghost"
                    style={{
                      gridColumnStart: props.ghostPos,
                      transition: "all 2s ease",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p>Ghost</p>
                  </div>
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
                    alt="logo"
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
