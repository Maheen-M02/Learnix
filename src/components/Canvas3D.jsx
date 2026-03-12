import { Canvas } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import Scene from './Scene'

export default function Canvas3D() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <Scene />
      </Canvas>
    </div>
  )
}
