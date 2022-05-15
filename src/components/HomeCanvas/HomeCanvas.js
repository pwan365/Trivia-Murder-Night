import React, { Suspense, useRef, useState, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars, TrackballControls, useGLTF } from "@react-three/drei";
import { Button, TextField } from "@mui/material";
import { SocketContext } from "../../context/socket";
import { useNavigate } from "react-router-dom";
import {StartGame} from '../StartGame/StartGame';
const HomeCanvas = () => {
  const socket = useContext(SocketContext);
  let navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const Spin = ({ children, ySpeed, xSpeed }) => {
    const ref = useRef();
    useFrame(() => {
      ref.current.rotation.y += ySpeed;
      ref.current.rotation.x += xSpeed;
    });
    return <group ref={ref}>{children}</group>;
  };

  const Ghost = () => {
    const gltf = useGLTF("/Ghost.glb");
    return (
      <Suspense>
        <primitive scale={0.005} position={[0, -0.25, 0]} object={gltf.scene} />
      </Suspense>
    );
  };

  const [RC, setRC] = useState("");

  const updateRoomCode = (event) => {
    event.preventDefault();
    setRC(event.target.value);
  };

  const createNewRoom = () => {
    socket.emit("newRoom", {
      numberOfPlayer: 2,
      numberOfRounds: 5,
      category: "Maths",
    });
  };

  const joinRoom = () => {
    socket.emit("joinRoom", RC);
  };

  socket.on("confirm", (roomDetail) => {
    navigate(`/gameRoom`, { state: roomDetail });
  });

  socket.on("roomCode", (roomCode) => {
    navigate(`/gameRoom`, { state: roomCode });
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: "100",
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
        <ambientLight />

        <Spin ySpeed={0.01} xSpeed={0}>
          <Ghost />
        </Spin>

        <TrackballControls
          noPan={true}
          noRotate={true}
          minDistance={5}
          maxDistance={25}
        />
        <Html center distanceFactor={10} position={[0, 0.05, 20]}>
          <TextField
            label="Room Code"
            variant="outlined"
            value={RC}
            onChange={updateRoomCode}
          />
          <Button
            onClick={() => setOpenModal(true)}
            variant="contained"
            elevation={10}
            style={{
              background: "hotpink",
              width: "200px",
              height: "50px",
            }}
          >
            PLAY!
          </Button>
          <Button
            variant="contained"
            elevation={10}
            style={{
              background: "hotpink",
              width: "200px",
              height: "50px",
            }}
            onClick={createNewRoom}
          >
            New room
          </Button>
          >
            PLAY!
          </Button>
          <StartGame open={openModal} onClose={() => setOpenModal(false)} />
        </Html>

        <Html center distanceFactor={5} position={[0, 0.05, 1]}>
          <div className="container">
            <h1 className="title">Ducks</h1>
            <p
              style={{
                fontSize: "2rem",
                color: "white",
                background: "rgba(0,0,0,0.5)",
                padding: "5px",
                borderRadius: "5px",
                pointerEvents: "none",
              }}
            >
              Scroll to continue
            </p>
          </div>
        </Html>

        <Spin xSpeed={0.0001} ySpeed={0.0001}>
          <Suspense>
            <Stars />
          </Suspense>
        </Spin>
      </Canvas>
    </div>
  );
};
export default HomeCanvas;
