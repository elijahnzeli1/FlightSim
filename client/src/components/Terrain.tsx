import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

export default function Terrain() {
  const grassTexture = useTexture("/textures/grass.png");
  
  // Configure texture repeat for better tiling
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(50, 50);

  // Generate random terrain heights
  const terrainData = useMemo(() => {
    const size = 200;
    const segments = 64;
    const heights: number[] = [];
    
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        // Create some rolling hills
        const x = (i / segments - 0.5) * size;
        const z = (j / segments - 0.5) * size;
        const height = Math.sin(x * 0.02) * Math.cos(z * 0.02) * 10 + 
                      Math.sin(x * 0.05) * Math.cos(z * 0.05) * 5;
        heights.push(height);
      }
    }
    
    return { size, segments, heights };
  }, []);

  return (
    <group>
      {/* Main terrain */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[terrainData.size, terrainData.size, terrainData.segments, terrainData.segments]} />
        <meshLambertMaterial map={grassTexture} />
      </mesh>
      
      {/* Water plane for visual reference */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[terrainData.size * 1.5, terrainData.size * 1.5]} />
        <meshLambertMaterial color="#4169E1" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
