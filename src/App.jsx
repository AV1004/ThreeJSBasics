import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef } from "react";

const Cube = (props) => {
  // Here useRef is use to give reference of mesh
  const meshRef = useRef();

  // UseFrame is use to animate the objects , you can understand it as frames or also can see as roll of old cameras
  // state refers to the state of object and delta is time difference between 2 frames
  useFrame((state, delta) => {
    // It Rotates the Cube in x
    meshRef.current.rotation.x += delta;
    // It Rotates the cube in y into 2.0
    meshRef.current.rotation.y += delta * 2.0;
    // Here we move the postion of the cube here we move it in z and we use logic of the sin here as sin is moving in between -1 to 1 so it move cube to backward and forward
    // And here understand that delta is very small value as it is difference of the frames
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh position={props.position} ref={meshRef}>
      <boxGeometry args={props.size} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas>
        <directionalLight position={[0, 0, 2]} />

        <group>
          <Cube position={[1, 1, 0]} size={[1, 1, 1]} color={"red"} />
          <Cube position={[-1, 1, 0]} size={[1, 1, 1]} color={"blue"} />
          <Cube position={[1, -1, 0]} size={[1, 1, 1]} color={"green"} />
          <Cube position={[-1, -1, 0]} size={[1, 1, 1]} color={"orange"} />
        </group>
      </Canvas>
    </>
  );
}

export default App;
