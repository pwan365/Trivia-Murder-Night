import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars, TrackballControls, useGLTF } from "@react-three/drei";

const HomeCanvas = () => {
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

  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "20px",
        zIndex: "-1",
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
          maxDistance={50}
        />
        <Html center distanceFactor={10} position={[0, 0.05, 20]}>
          <div>
            <h1>hahahahha</h1>
          </div>
        </Html>

        <Spin xSpeed={0.0001} ySpeed={0.0001}>
          <Stars />
        </Spin>
      </Canvas>
    </div>
  );
};
export default HomeCanvas;
