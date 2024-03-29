import { Canvas } from "@react-three/fiber";
import "./App.css";

const Cube = (props) => {
  return (
    <mesh position={props.position}>
      {/* Here boxGeometry is a 3rd Box in this mesh */}
      {/* args can set size of the shap */}
      {/* <boxGeometry args={[2, 2, 2]} /> */}
      <boxGeometry args={props.size} />
      {/* Now to give it color you have to use metrial */}
      {/* without lighting the meshStandardMatrial will be default visible as black color as lighting is not activted */}
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};

function App() {
  return (
    <>
      {/* So in R3F you can say in our theater the <Canvas> is our stage on that we will perform our every operations */}
      <Canvas>
        {/* Here mesh a platform a perticular platform where our shape can be render */}
        {/* Now the lighting is must for see the actual matrial of shap in mesh  */}
        <directionalLight position={[0, 0, 2]} />
        {/* <directionalLight position={[0, 0, 2]} intensity={0.1} /> */}
        {/* AmibientLight is another type of light, in Light we can set intensity as shown below */}
        {/* <ambientLight intensity={0.1} />
        <ambientLight /> */}
        {/* You can give position to mesh also! */}
        {/* group can use to move and group many meshes */}
        <group>
          {/* <group position={[0, -1, 0]}> */}
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
