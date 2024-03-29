import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

import "./App.css";

const Cube = (props) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 2.0;
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh position={props.position} ref={meshRef}>
      <boxGeometry args={props.size} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};

const Sphere = (props) => {
  const meshRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useFrame((state, delta) => {
    // Using isHover here!
    const speed = isHover ? 1 : 0.2;
    meshRef.current.rotation.y += delta * speed;
  });

  return (
    <mesh
      position={props.position}
      ref={meshRef}
      // onPointerEnter means when cursor enters the mesh stopPropagation stops the underlying handlers to firing
      onPointerEnter={(event) => (event.stopPropagation(), setIsHover(true))}
      // onPointerLeave fires when cursor leaves the mesh!
      onPointerLeave={() => setIsHover(false)}
      // It is normal onClick event
      onClick={() => setIsClick(!isClick)}
      // scale can be increase or decrease the scale of the mesh repectvie to actual size!
      scale={isClick ? 2 : 1}
    >
      <sphereGeometry args={props.size} />
      <meshStandardMaterial color={isHover ? "red" : props.color} wireframe />
    </mesh>
  );
};

const Tours = (props) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 2.0;
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh position={props.position} ref={meshRef}>
      <torusGeometry args={props.size} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};

const ToursKnot = (props) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 2.0;
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh position={props.position} ref={meshRef}>
      <torusKnotGeometry args={props.size} />
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
          {/* <Cube position={[1, 1, 0]} size={[1, 1, 1]} color={"red"} /> */}

          <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"blue"} />

          {/* <Tours
            position={[1, -1, 0]}
            size={[0.8, 0.3, 30, 30]}
            color={"green"}
          />
          <ToursKnot
            position={[-1, -1, 0]}
            size={[0.8, 0.1, 1000, 50]}
            color={"hotPink"}
          /> */}
        </group>
      </Canvas>
    </>
  );
}

export default App;
