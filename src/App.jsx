import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { DirectionalLightHelper } from "three";
import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";

import "./App.css";
import { useControls } from "leva";

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
  const toursKnotRef = useRef();

  const { color, radius } = useControls({
    color: "lightblue",
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.5,
    },
  });

  useFrame((state, delta) => {
    // meshRef.current.rotation.x += delta;
    // meshRef.current.rotation.y += delta * 2.0;
    // meshRef.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh position={props.position} ref={meshRef}>
      <torusKnotGeometry args={[radius, ...props.size]} ref={toursKnotRef} />
      {/* <meshStandardMaterial color={props.color} /> */}
      {/* meshWobbleMatrial is an effect , it kind of give wobble effect to your mesh */}
      <MeshWobbleMaterial color={color} factor={1} speed={5} />
    </mesh>
  );
};

const Scene = () => {
  const directionalLightRef = useRef();

  // Now to see wether our direcitonalLight is coming from we can use this hook of drei
  // So the arguments are(refference of tag , we have to tell it which the component is (and this is imported from Three) , size , color)
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "White");

  // This leva package is use to confiugure your objects and lights (any components)directly in broswer
  const { lightColor, lightIntensity } = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });

  return (
    <>
      <directionalLight
        position={[0, 0, 2]}
        ref={directionalLightRef}
        color={lightColor}
        intensity={lightIntensity}
      />

      <group>
        {/* <Cube position={[1, 1, 0]} size={[1, 1, 1]} color={"red"} /> */}

        {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"blue"} /> */}

        {/* <Tours
        position={[1, -1, 0]}
        size={[0.8, 0.3, 30, 30]}
        color={"green"}
      /> */}

        <ToursKnot
          position={[0, 0, 0]}
          size={[0.1, 1000, 50]}
          color={"hotPink"}
        />
      </group>

      {/* This OrbitControls named Tag is from package drei that is use in many ways like moving around with screen and many things */}
      <OrbitControls />
      {/* <OrbitControls enableZoom={false} /> */}
    </>
  );
};

function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
