import { Suspense, useRef } from "react"
import { useFrame } from "react-three-fiber"

import { Camera } from "./Camera"
import { Dude } from "./Dude"

import "./App.css"
import { Environment } from "drei"

export function Scene() {
  const boxMesh = useRef<any>()

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
      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <Dude />
      </Suspense>
    </>
  )
}
