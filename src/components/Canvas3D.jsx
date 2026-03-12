import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

export default function Canvas3D() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
