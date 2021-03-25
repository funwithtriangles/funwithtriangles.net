import styled from "styled-components"

import { useEffect } from "react"
import { Canvas } from "react-three-fiber"
import { Page } from "./Page"
import { Scene } from "./Scene"
import { pageData } from "../page-data"

import { state } from "../state"
import { lerp } from "../utils/lerp"
import { useProgress } from "drei"

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #f58b52;
  z-index: -1;
  top: 0;
  left: 0;
`

const fuzzyThresh = 0.6

function Loader({ progress }: { progress: number }) {
  return <h2>{Math.round(progress)}</h2>
}

export function App() {
  const { progress } = useProgress()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      state.prevPagePos = state.pagePos
      state.pagePos = window.pageYOffset / window.innerHeight
      state.currPageIndex = Math.floor(state.pagePos)

      if (
        state.pagePos > state.prevPagePos &&
        state.pagePos % 1 > fuzzyThresh
      ) {
        // Scrolling down
        state.fuzzyPageIndex = Math.min(
          state.currPageIndex + 1,
          pageData.length - 1
        )
      } else if (
        state.pagePos < state.prevPagePos &&
        state.pagePos % 1 < 1 - fuzzyThresh
      ) {
        // Scrolling up
        state.fuzzyPageIndex = Math.max(state.currPageIndex, 0)
      }
    })

    window.addEventListener("mousemove", (e) => {
      state.mousePos.set(
        lerp(-1, 1, e.clientX / window.innerWidth),
        lerp(1, -1, e.clientY / window.innerHeight)
      )
    })
  }, [])

  return (
    <>
      <Loader progress={progress} />
      <Background>
        <Canvas shadowMap>
          <Scene mainAssetsHaveLoaded={progress === 100} />
        </Canvas>
      </Background>

      {pageData.map((props, i) => (
        <Page key={i} {...props} />
      ))}
    </>
  )
}
