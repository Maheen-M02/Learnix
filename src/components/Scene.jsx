import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store'

/* ============ Detect Mobile ============ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isMobile
}

/* ============ Camera Rig ============ */
function CameraRig() {
  const isMobile = useIsMobile()

  useFrame((state) => {
    const { mousePosition } = useStore.getState()

    if (isMobile) {
      // On mobile: fixed camera, slightly higher, further back for smaller book
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.03)
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.8, 0.03)
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10, 0.03)
    } else {
      const targetX = mousePosition.x * 0.5
      const targetY = mousePosition.y * 0.3 + 0.5
      const targetZ = 8

      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.03)
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.03)
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.03)
    }

    state.camera.lookAt(0, 0, 0)
  })
  return null
}

/* ============ Single Turning Page ============ */
function TurningPage({ index, totalPages, pageW, pageH }) {
  const groupRef = useRef()
  const currentAngle = useRef(0)

  const lines = useMemo(() => {
    const arr = []
    const seed = index * 7 + 3
    for (let i = 0; i < 14; i++) {
      const y = pageH * 0.42 - i * (pageH * 0.065)
      const w = pageW * 0.45 + ((seed * (i + 1) * 17) % 100) / 100 * pageW * 0.35
      arr.push({ y, w, key: i })
    }
    return arr
  }, [index, pageW, pageH])

  useFrame(() => {
    const { scrollProgress } = useStore.getState()

    const turnStart = index / totalPages
    const turnEnd = (index + 1) / totalPages
    const pageProgress = THREE.MathUtils.clamp(
      (scrollProgress - turnStart) / (turnEnd - turnStart),
      0, 1
    )

    const targetAngle = pageProgress * Math.PI
    currentAngle.current = THREE.MathUtils.lerp(currentAngle.current, targetAngle, 0.08)

    if (groupRef.current) {
      groupRef.current.rotation.y = currentAngle.current
      const midTurn = Math.sin(currentAngle.current)
      groupRef.current.position.y = midTurn * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, index * 0.006 - (totalPages * 0.003)]}>
      {/* Front face */}
      <mesh position={[pageW / 2, 0, 0.002]}>
        <planeGeometry args={[pageW, pageH]} />
        <meshStandardMaterial color="#fefefe" roughness={0.85} side={THREE.FrontSide} />
      </mesh>
      {/* Back face */}
      <mesh position={[pageW / 2, 0, -0.002]}>
        <planeGeometry args={[pageW, pageH]} />
        <meshStandardMaterial color="#f8f5ee" roughness={0.85} side={THREE.BackSide} />
      </mesh>
      {/* Text lines — front */}
      <group position={[pageW * 0.12, 0, 0.004]}>
        {lines.map((line) => (
          <mesh key={line.key} position={[line.w / 2, line.y, 0]}>
            <planeGeometry args={[line.w, 0.035]} />
            <meshStandardMaterial color="#c8c4bb" transparent opacity={0.5} side={THREE.FrontSide} />
          </mesh>
        ))}
      </group>
      {/* Text lines — back */}
      <group position={[pageW * 0.12, 0, -0.004]}>
        {lines.map((line) => (
          <mesh key={`b${line.key}`} position={[line.w / 2, line.y, 0]}>
            <planeGeometry args={[line.w, 0.035]} />
            <meshStandardMaterial color="#c8c4bb" transparent opacity={0.35} side={THREE.BackSide} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ============ 3D Open Book ============ */
function Book3D() {
  const groupRef = useRef()
  const frontCoverRef = useRef()
  const backCoverRef = useRef()
  const [openReady, setOpenReady] = useState(false)
  const openProgress = useRef(0)
  const isMobile = useIsMobile()

  // Scale down on mobile
  const scale = isMobile ? 0.62 : 1

  const coverW = 4.0
  const coverH = 5.2
  const coverDepth = 0.12
  const spineW = 0.25
  const spineDepth = 0.8
  const pageW = 3.7
  const pageH = 5.0
  const totalPages = 7

  useEffect(() => {
    const timer = setTimeout(() => setOpenReady(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const { mousePosition } = useStore.getState()

    const targetOpen = openReady ? 1 : 0
    openProgress.current = THREE.MathUtils.lerp(openProgress.current, targetOpen, 0.025)
    const coverAngle = openProgress.current * (Math.PI / 1.8)

    if (frontCoverRef.current) frontCoverRef.current.rotation.y = -coverAngle
    if (backCoverRef.current) backCoverRef.current.rotation.y = coverAngle

    if (groupRef.current) {
      if (isMobile) {
        // Gentle auto-rotation on mobile
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x, -0.2 + Math.sin(t * 0.3) * 0.03, 0.02
        )
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z, Math.sin(t * 0.2) * 0.02, 0.02
        )
      } else {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x, -0.25 + mousePosition.y * 0.06, 0.03
        )
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z, mousePosition.x * 0.04, 0.03
        )
      }
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.06
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 1]} rotation={[-0.25, Math.PI, 0]} scale={scale}>
      {/* SPINE */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[spineW, coverH, spineDepth]} />
        <meshStandardMaterial color="#3E1F0D" roughness={0.7} metalness={0.08} />
      </mesh>
      {/* Gold bands */}
      <mesh position={[0, coverH * 0.43, 0]}>
        <boxGeometry args={[spineW + 0.01, 0.07, spineDepth + 0.01]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, -coverH * 0.43, 0]}>
        <boxGeometry args={[spineW + 0.01, 0.07, spineDepth + 0.01]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* FRONT COVER */}
      <group ref={frontCoverRef} position={[spineW / 2, 0, 0]}>
        <mesh position={[coverW / 2, 0, 0]}>
          <boxGeometry args={[coverW, coverH, coverDepth]} />
          <meshStandardMaterial color="#6B3A2A" roughness={0.6} metalness={0.08} />
        </mesh>
        {/* Gold frame */}
        <mesh position={[coverW / 2, 0, coverDepth / 2 + 0.002]}>
          <planeGeometry args={[coverW * 0.72, coverH * 0.78]} />
          <meshStandardMaterial color="#C9A84C" roughness={0.35} metalness={0.5} transparent opacity={0.1} />
        </mesh>
        {/* Gold lines */}
        <mesh position={[coverW / 2, coverH * 0.34, coverDepth / 2 + 0.003]}>
          <planeGeometry args={[coverW * 0.6, 0.035]} />
          <meshStandardMaterial color="#C9A84C" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[coverW / 2, -coverH * 0.34, coverDepth / 2 + 0.003]}>
          <planeGeometry args={[coverW * 0.6, 0.035]} />
          <meshStandardMaterial color="#C9A84C" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Diamond emblem */}
        <mesh position={[coverW / 2, 0, coverDepth / 2 + 0.004]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.45, 0.45]} />
          <meshStandardMaterial color="#C9A84C" roughness={0.25} metalness={0.7} transparent opacity={0.35} />
        </mesh>
      </group>

      {/* BACK COVER */}
      <group ref={backCoverRef} position={[-spineW / 2, 0, 0]}>
        <mesh position={[-coverW / 2, 0, 0]}>
          <boxGeometry args={[coverW, coverH, coverDepth]} />
          <meshStandardMaterial color="#5C3222" roughness={0.65} metalness={0.08} />
        </mesh>
      </group>

      {/* Pages block base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, pageH * 0.96, spineDepth * 0.82]} />
        <meshStandardMaterial color="#f5f0e6" roughness={0.95} />
      </mesh>

      {/* Turning Pages */}
      {Array.from({ length: totalPages }).map((_, i) => (
        <TurningPage key={i} index={i} totalPages={totalPages} pageW={pageW} pageH={pageH} />
      ))}

      {/* Soft shadow */}
      <mesh position={[0, -coverH / 2 - 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial color="#8ab4d6" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/* ============ Main Scene ============ */
export default function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.7} color="#f0f4ff" />
      <directionalLight position={[5, 8, 6]} intensity={1.3} color="#ffffff" />
      <directionalLight position={[-4, 4, -3]} intensity={0.4} color="#b8d4f0" />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#e8d5b5" />
      <pointLight position={[3, -2, 4]} intensity={0.3} color="#a8c8e8" />
      <Book3D />
    </>
  )
}
