'use client'
import { Canvas, useFrame, applyProps } from '@react-three/fiber'
import { Environment, Gltf, Lightformer, ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import React, { useMemo } from 'react'
import * as THREE from 'three'
import styles from './style.module.scss'

export const Experience = () => {
  return (
    <div className={styles.cor} style={{ width: '100vw', height: '100vh' }}>
      <Canvas gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 25 }}>
        <Gltf src="/models/lambo.glb" position={[4, -0.45, 1.5]} rotation={[0, -0.7, 0]} scale={0.010} />
        <color attach="background" args={['#151515']} />
        <hemisphereLight intensity={0.5} />
        <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={15} blur={0.5} opacity={1} far={20} />
        <mesh scale={4} position={[5, -1.161, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
          <ringGeometry args={[0.9, 1, 4, 1]} />
          <meshStandardMaterial color="white" roughness={0.75} />
        </mesh>
        <mesh scale={4} position={[0.3, -1.161, 2.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
          <ringGeometry args={[0.9, 1, 3, 1]} />
          <meshStandardMaterial color="white" roughness={0.75} />
        </mesh>
        <Environment resolution={512}>
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
          <Lightformer form="ring" color="white" intensity={20} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        </Environment>
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
        <CameraRig />
        <Lamborghini />
      </Canvas>
    </div>
  )
}

function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime
   
    state.camera.position.lerp(v.set(Math.sin(t * 0.5) * 5, Math.sin(t * 0.5) * 2, 15 + Math.cos(t * 0.5) * 0.05), 0.1)
    state.camera.lookAt(0, 0, 0)
  })
}

function Lamborghini(props) {
  const { scene, nodes, materials } = useGLTF('/models/lambo.glb')

  useMemo(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        if (node.name.startsWith('glass')) node.geometry.computeVertexNormals()
      }
    })

    applyProps(materials.FrameBlack, { metalness: 0.75, roughness: 0, color: 'black' })
    applyProps(materials.Chrome, { metalness: 1, roughness: 0, color: '#333' })
    applyProps(materials.BreakDiscs, { metalness: 0.2, roughness: 0.2, color: '#555' })
    applyProps(materials.TiresGum, { metalness: 0, roughness: 0.4, color: '#181818' })
    applyProps(materials.GreyElements, { metalness: 0, color: '#292929' })
    applyProps(materials.emitbrake, { emissiveIntensity: 3, toneMapped: false })
    applyProps(materials.LightsFrontLed, { emissiveIntensity: 3, toneMapped: false })
    nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
      roughness: 0.3,
      metalness: 0.05,
      color: '#289402',
      envMapIntensity: 0.75,
      clearcoatRoughness: 0,
      clearcoat: 1
    })
  }, [nodes, materials])

  return <primitive object={scene} {...props} position={[4, -0.45, 1.5]} rotation={[0, -0.7, 0]} scale={0.010} />
}
