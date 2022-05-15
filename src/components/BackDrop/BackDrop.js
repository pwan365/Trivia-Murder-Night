import React from "react";
import { Canvas } from "@react-three/fiber";
import { Cloud } from "@react-three/drei";
import { useLocation } from "react-router-dom";
const BackDrop = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        zIndex: "-10",
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
        <Cloud opacity={0.5} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[20, 20, 3]} intensity={1} />
      </Canvas>
    </div>
  );
};
export default BackDrop;
