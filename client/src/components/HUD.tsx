import { useFlightControls } from "../lib/stores/useFlightControls";

export default function HUD() {
  const { altitude, speed, heading, throttle } = useFlightControls();

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px'
    }}>
      {/* Top left - Flight data */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>ALTITUDE:</strong> {Math.round(altitude)}ft
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>SPEED:</strong> {Math.round(speed * 50)}kts
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>HEADING:</strong> {Math.round(heading)}°
        </div>
        <div>
          <strong>THROTTLE:</strong> {Math.round(throttle * 100)}%
        </div>
      </div>

      {/* Top right - Controls help */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        fontSize: '14px'
      }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>FLIGHT CONTROLS:</div>
        <div>W/S - Pitch Up/Down</div>
        <div>A/D - Yaw Left/Right</div>
        <div>Q/E - Roll Left/Right</div>
        <div>↑↓←→ - Fine Control</div>
        <div>Shift/Ctrl - Throttle</div>
      </div>

      {/* Bottom center - Crosshair */}
      <div style={{
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        width: '20px',
        height: '20px',
        border: '2px solid white',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          background: 'white',
          borderRadius: '50%'
        }} />
      </div>

      {/* Artificial horizon indicator */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
        height: '100px',
        background: 'rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          right: '0',
          height: '2px',
          background: 'white'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '12px'
        }}>
          HORIZON
        </div>
      </div>
    </div>
  );
}
