export default function Lights() {
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.4} />
      
      {/* Directional light for sun simulation */}
      <directionalLight
        position={[50, 100, 50]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      
      {/* Additional fill light */}
      <directionalLight
        position={[-20, 50, -20]}
        intensity={0.3}
      />
    </>
  );
}
