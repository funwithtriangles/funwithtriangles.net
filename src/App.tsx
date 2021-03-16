import { useEffect, useRef, useState } from "react"
import {
  Canvas,
  PerspectiveCameraProps,
  useFrame,
  useThree,
} from "react-three-fiber"
import { Object3D, PerspectiveCamera } from "three"

import "./App.css"

const offsetPositions = [-0.25, 0.25, 0, 0]

function Camera({ xOffset }: { xOffset: number }) {
  const ref = useRef<PerspectiveCamera>(new PerspectiveCamera(75, 0, 0.1, 1000))
  const { setDefaultCamera } = useThree()
  useEffect(() => {
    ref.current.position.z = 1
    void setDefaultCamera(ref.current)
  })

  useFrame(() => {
    const fullWidth = window.innerWidth
    const fullHeight = window.innerHeight
    const currIndex = Math.floor(xOffset)
    const start = fullWidth * offsetPositions[currIndex]
    const end = fullWidth * offsetPositions[currIndex + 1]

    const x = start + (end - start) * (xOffset % 1)
    ref.current.setViewOffset(
      fullWidth,
      fullHeight,
      x,
      0,
      fullWidth,
      fullHeight
    )
    ref.current.updateProjectionMatrix()
  })

  return <perspectiveCamera ref={ref} />
}

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
        <div className="page">
          <div className="block">
            <h1>Heya!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              praesentium consequatur laudantium tenetur dolorum, doloribus
              reprehenderit alias, minus hic accusantium repellendus fugiat illo
              tempore quidem non corrupti enim inventore et.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              praesentium consequatur laudantium tenetur dolorum, doloribus
              reprehenderit alias, minus hic accusantium repellendus fugiat illo
              tempore quidem non corrupti enim inventore et.
            </p>
          </div>
        </div>
        <div className="page right">
          <div className="block">
            <h1>Heya!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              praesentium consequatur laudantium tenetur dolorum, doloribus
              reprehenderit alias, minus hic accusantium repellendus fugiat illo
              tempore quidem non corrupti enim inventore et.
            </p>
          </div>
        </div>
        <div className="page"></div>
      </div>
    </>
  )
}

export default App
