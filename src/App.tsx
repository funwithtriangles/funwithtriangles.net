import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { Page } from "./Page"

import { Camera } from "./Camera"

import { pageData } from "./page-data"

import "./App.css"

function Scene({ pagePos }: { pagePos: number }) {
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
      <Camera xOffset={pagePos} />
      <mesh ref={boxMesh}>
        <boxBufferGeometry args={[0.2, 0.2, 0.2]} />
        <meshNormalMaterial />
      </mesh>
    </>
  )
}

function App() {
  const [pagePos, setPagePos] = useState(0)

  useEffect(() => {
    window.onscroll = () => {
      setPagePos(window.pageYOffset / window.innerHeight)
    }
  }, [])

  return (
    <>
      <div className="background">
        <Canvas>
          <Scene pagePos={pagePos} />
        </Canvas>
      </div>

      <div className="content">
        {pageData.map((props, i) => (
          <Page key={i} {...props} />
        ))}
      </div>
    </>
  )
}

export default App
