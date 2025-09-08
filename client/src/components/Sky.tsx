import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Sky() {
  const skyTexture = useTexture("/textures/sky.png");
  
  // Configure texture for spherical mapping
  skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWrapping;
  skyTexture.repeat.set(1, 1);

  return (
    <mesh>
      <sphereGeometry args={[1000, 32, 16]} />
      <meshBasicMaterial 
        map={skyTexture}
        side={THREE.BackSide}
        fog={false}
      />
    </mesh>
  );
}
