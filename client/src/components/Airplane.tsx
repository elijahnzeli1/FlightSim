import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useFlightControls } from "../lib/stores/useFlightControls";
import { updateFlightPhysics } from "../lib/flightPhysics";

export default function Airplane() {
  const airplaneRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [subscribe, getState] = useKeyboardControls();
  const { 
    position, 
    rotation, 
    velocity, 
    angularVelocity, 
    throttle,
    updatePosition,
    updateRotation,
    updateVelocity,
    updateAngularVelocity,
    updateThrottle,
    updateAltitude,
    updateSpeed,
    updateHeading
  } = useFlightControls();

  // Camera offset from airplane
  const cameraOffset = useRef(new THREE.Vector3(0, 5, 15));
  const cameraTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!airplaneRef.current) return;

    const controls = getState();
    
    // Update flight physics
    const newState = updateFlightPhysics({
      position,
      rotation,
      velocity,
      angularVelocity,
      throttle,
      controls,
      delta
    });

    // Update stores
    updatePosition(newState.position);
    updateRotation(newState.rotation);
    updateVelocity(newState.velocity);
    updateAngularVelocity(newState.angularVelocity);
    updateThrottle(newState.throttle);

    // Update HUD data
    updateAltitude(newState.position.y);
    updateSpeed(newState.velocity.length());
    updateHeading(newState.rotation.y * 180 / Math.PI);

    // Apply transforms to airplane
    airplaneRef.current.position.copy(newState.position);
    airplaneRef.current.rotation.setFromVector3(newState.rotation);

    // Terrain collision detection
    const groundHeight = 0;
    if (newState.position.y < groundHeight + 2) {
      const pos = newState.position.clone();
      pos.y = groundHeight + 2;
      updatePosition(pos);
      
      // Reduce velocity on ground contact
      const vel = newState.velocity.clone();
      vel.multiplyScalar(0.8);
      updateVelocity(vel);
    }

    // Update camera to follow airplane
    const airplanePosition = airplaneRef.current.position;
    const airplaneRotation = airplaneRef.current.rotation;
    
    // Calculate camera position relative to airplane
    const cameraWorldPosition = cameraOffset.current.clone();
    cameraWorldPosition.applyEuler(airplaneRotation);
    cameraWorldPosition.add(airplanePosition);
    
    // Smooth camera movement
    camera.position.lerp(cameraWorldPosition, 0.1);
    
    // Camera looks at airplane
    cameraTarget.current.copy(airplanePosition);
    camera.lookAt(cameraTarget.current);

    console.log("Flight Controls:", {
      forward: controls.forward,
      throttle: newState.throttle,
      speed: newState.velocity.length().toFixed(2),
      altitude: newState.position.y.toFixed(2)
    });
  });

  return (
    <group ref={airplaneRef}>
      {/* Airplane body (fuselage) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
        <meshLambertMaterial color="#cccccc" />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[8, 0.2, 1.5]} />
        <meshLambertMaterial color="#dddddd" />
      </mesh>
      
      {/* Tail wing */}
      <mesh position={[0, 0, -1.8]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[3, 0.1, 0.8]} />
        <meshLambertMaterial color="#dddddd" />
      </mesh>
      
      {/* Vertical tail */}
      <mesh position={[0, 1, -1.8]}>
        <boxGeometry args={[0.1, 2, 1]} />
        <meshLambertMaterial color="#dddddd" />
      </mesh>
      
      {/* Propeller */}
      <mesh position={[0, 0, 2]} rotation={[0, Date.now() * 0.02, 0]}>
        <boxGeometry args={[0.1, 3, 0.1]} />
        <meshLambertMaterial color="#333333" />
      </mesh>
      
      {/* Engine cowling */}
      <mesh position={[0, 0, 1.8]}>
        <cylinderGeometry args={[0.4, 0.3, 0.8, 8]} />
        <meshLambertMaterial color="#888888" />
      </mesh>
    </group>
  );
}
