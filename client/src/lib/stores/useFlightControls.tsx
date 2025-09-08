import { create } from "zustand";
import * as THREE from "three";

interface FlightControlsState {
  // Aircraft state
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  throttle: number;
  
  // HUD data
  altitude: number;
  speed: number;
  heading: number;
  
  // Actions
  updatePosition: (position: THREE.Vector3) => void;
  updateRotation: (rotation: THREE.Vector3) => void;
  updateVelocity: (velocity: THREE.Vector3) => void;
  updateAngularVelocity: (angularVelocity: THREE.Vector3) => void;
  updateThrottle: (throttle: number) => void;
  updateAltitude: (altitude: number) => void;
  updateSpeed: (speed: number) => void;
  updateHeading: (heading: number) => void;
  reset: () => void;
}

export const useFlightControls = create<FlightControlsState>((set) => ({
  // Initial aircraft state
  position: new THREE.Vector3(0, 50, 0),
  rotation: new THREE.Vector3(0, 0, 0),
  velocity: new THREE.Vector3(0, 0, 0),
  angularVelocity: new THREE.Vector3(0, 0, 0),
  throttle: 0.3,
  
  // Initial HUD data
  altitude: 50,
  speed: 0,
  heading: 0,
  
  // Actions
  updatePosition: (position) => set({ position }),
  updateRotation: (rotation) => set({ rotation }),
  updateVelocity: (velocity) => set({ velocity }),
  updateAngularVelocity: (angularVelocity) => set({ angularVelocity }),
  updateThrottle: (throttle) => set({ throttle }),
  updateAltitude: (altitude) => set({ altitude }),
  updateSpeed: (speed) => set({ speed }),
  updateHeading: (heading) => set({ heading }),
  
  reset: () => set({
    position: new THREE.Vector3(0, 50, 0),
    rotation: new THREE.Vector3(0, 0, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    angularVelocity: new THREE.Vector3(0, 0, 0),
    throttle: 0.3,
    altitude: 50,
    speed: 0,
    heading: 0
  })
}));
