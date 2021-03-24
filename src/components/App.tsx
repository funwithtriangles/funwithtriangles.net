import styled from "styled-components"

import { useEffect } from "react"
import { Canvas } from "react-three-fiber"
import { Page } from "./Page"
import { Scene } from "./Scene"
import { pageData } from "../page-data"

import { state } from "../state"
import { lerp } from "../utils/lerp"

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #f58b52;
  z-index: -1;
  top: 0;
  left: 0;
`

export function App() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      state.pagePos = window.pageYOffset / window.innerHeight
      state.currPageIndex = Math.floor(state.pagePos)
      console.log(state.pagePos, state.currPageIndex)
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
      <Background>
        <Canvas shadowMap>
          <Scene />
        </Canvas>
      </Background>

      {pageData.map((props, i) => (
        <Page key={i} {...props} />
      ))}
    </>
  )
}
