import * as THREE from "three";

interface FlightState {
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  throttle: number;
  controls: any;
  delta: number;
}

export function updateFlightPhysics(state: FlightState): Omit<FlightState, 'controls' | 'delta'> {
  const { position, rotation, velocity, angularVelocity, throttle, controls, delta } = state;
  
  // Clone vectors to avoid mutation
  const newPosition = position.clone();
  const newRotation = rotation.clone();
  const newVelocity = velocity.clone();
  const newAngularVelocity = angularVelocity.clone();
  let newThrottle = throttle;

  // Flight control inputs
  const pitchInput = (controls.forward ? 1 : 0) - (controls.backward ? 1 : 0) + 
                    (controls.pitchUp ? 0.5 : 0) - (controls.pitchDown ? 0.5 : 0);
  const yawInput = (controls.right ? 1 : 0) - (controls.left ? 1 : 0) + 
                   (controls.yawRight ? 0.5 : 0) - (controls.yawLeft ? 0.5 : 0);
  const rollInput = (controls.rollRight ? 1 : 0) - (controls.rollLeft ? 1 : 0);
  const throttleInput = (controls.throttleUp ? 1 : 0) - (controls.throttleDown ? 1 : 0);

  // Update throttle
  newThrottle = Math.max(0, Math.min(1, newThrottle + throttleInput * delta * 0.5));

  // Angular velocity updates (flight controls)
  const controlSensitivity = 2.0;
  newAngularVelocity.x += pitchInput * controlSensitivity * delta;
  newAngularVelocity.y += yawInput * controlSensitivity * delta;
  newAngularVelocity.z += rollInput * controlSensitivity * delta;

  // Apply angular damping
  newAngularVelocity.multiplyScalar(0.95);

  // Update rotation based on angular velocity
  newRotation.add(newAngularVelocity.clone().multiplyScalar(delta));

  // Clamp extreme rotations
  newRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, newRotation.x));
  newRotation.z = Math.max(-Math.PI/2, Math.min(Math.PI/2, newRotation.z));

  // Create transformation matrix for forward direction
  const forwardDirection = new THREE.Vector3(0, 0, 1);
  forwardDirection.applyEuler(new THREE.Euler(newRotation.x, newRotation.y, newRotation.z));

  // Thrust force
  const thrustForce = forwardDirection.clone().multiplyScalar(newThrottle * 50);
  
  // Apply thrust to velocity
  newVelocity.add(thrustForce.clone().multiplyScalar(delta));

  // Gravity
  const gravity = new THREE.Vector3(0, -9.81, 0);
  newVelocity.add(gravity.clone().multiplyScalar(delta));

  // Air resistance (simplified)
  const drag = newVelocity.clone().multiplyScalar(-0.1 * newVelocity.length());
  newVelocity.add(drag.clone().multiplyScalar(delta));

  // Update position
  newPosition.add(newVelocity.clone().multiplyScalar(delta));

  return {
    position: newPosition,
    rotation: newRotation,
    velocity: newVelocity,
    angularVelocity: newAngularVelocity,
    throttle: newThrottle
  };
}
