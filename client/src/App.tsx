import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";
import FlightSimulator from "./components/FlightSimulator";
import HUD from "./components/HUD";

// Define control keys for the flight simulator
enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  pitchUp = 'pitchUp',
  pitchDown = 'pitchDown',
  yawLeft = 'yawLeft',
  yawRight = 'yawRight',
  rollLeft = 'rollLeft',
  rollRight = 'rollRight',
  throttleUp = 'throttleUp',
  throttleDown = 'throttleDown'
}

const controls = [
  { name: Controls.forward, keys: ["KeyW"] },
  { name: Controls.backward, keys: ["KeyS"] },
  { name: Controls.left, keys: ["KeyA"] },
  { name: Controls.right, keys: ["KeyD"] },
  { name: Controls.pitchUp, keys: ["ArrowUp"] },
  { name: Controls.pitchDown, keys: ["ArrowDown"] },
  { name: Controls.yawLeft, keys: ["ArrowLeft"] },
  { name: Controls.yawRight, keys: ["ArrowRight"] },
  { name: Controls.rollLeft, keys: ["KeyQ"] },
  { name: Controls.rollRight, keys: ["KeyE"] },
  { name: Controls.throttleUp, keys: ["ShiftLeft"] },
  { name: Controls.throttleDown, keys: ["ControlLeft"] }
];

function App() {
  const [showCanvas, setShowCanvas] = useState(true);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {showCanvas && (
        <KeyboardControls map={controls}>
          <Canvas
            shadows
            camera={{
              position: [0, 10, 20],
              fov: 75,
              near: 0.1,
              far: 2000
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance"
            }}
          >
            <color attach="background" args={["#87CEEB"]} />
            
            <Suspense fallback={null}>
              <FlightSimulator />
            </Suspense>
          </Canvas>
          <HUD />
        </KeyboardControls>
      )}
    </div>
  );
}

export default App;
