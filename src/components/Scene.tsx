import { Suspense, useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"

import { Camera } from "./Camera"
import { Dude } from "./Dude"

import { Environment, useHelper } from "drei"
import { CameraHelper, DirectionalLight, Light } from "three"

function Plane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeBufferGeometry args={[10, 10, 1, 1]} />
      <shadowMaterial transparent opacity={0.2} />
    </mesh>
  )
}

export function Scene() {
  const boxMesh = useRef<any>()
  const d = 2

  useFrame(() => {
    const node = boxMesh?.current

    if (node !== undefined) {
      node.rotation.x += 0.01
      node.rotation.y += 0.01
    }
  })

  return (
    <>
      <Camera />
      <directionalLight
        intensity={0.5}
        position={[-8, 10, 20]}
        shadow-camera-left={d * -1}
        shadow-camera-bottom={d * -1}
        shadow-camera-right={d}
        shadow-camera-top={d}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadowMapWidth={1024}
        shadowMapHeight={1024}
        castShadow
      />
      <Plane rotation={[-0.5 * Math.PI, 0, 0]} />
      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <Dude />
      </Suspense>
    </>
  )
}
