import { useEffect, useRef, useState } from "react"
import {
  Canvas,
  PerspectiveCameraProps,
  useFrame,
  useThree,
} from "react-three-fiber"
import { PerspectiveCamera } from "three"

import "./App.css"

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
    const x = -fullWidth / 4 + (fullWidth / 2) * xOffset
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
  return (
    <>
      <Camera xOffset={pagePos} />
      <mesh>
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
      </div>
    </>
  )
}

export default App
