import styled from "styled-components"

import { useEffect, useRef } from "react"
import { Canvas } from "react-three-fiber"
import { Page } from "./Page"
import { Scene } from "./Scene"
import { Loader } from "./Loader"
import { pageData } from "../page-data"

import { state } from "../state"
import { lerp } from "../utils/lerp"
import { useProgress } from "drei"
import { breakpoints } from "../constants"

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #f58b52;
  z-index: -1;
  top: 0;
  left: 0;
`

const PagesContainer = styled.div`
  @media (min-width: ${breakpoints.medium}px) {
    backdrop-filter: blur(20px);
    background: rgba(252, 102, 3, 0.5);
    width: 50%;
    margin-left: auto;
  }
`

const fuzzyThresh = 0.6

export function App() {
  const { progress } = useProgress()
  const pageRefs = useRef(new Array(pageData.length))

  useEffect(() => {
    if (progress !== 100) return

    const updateScrollState = () => {
      for (let i = pageRefs.current.length - 1; i >= 0; i--) {
        // Loop through page elements backwards to see which one is current
        // The first one to be above the top of the viewport is our current page
        if (pageRefs.current[i].offsetTop - window.pageYOffset <= 0) {
          state.currPageIndex = i
          break
        }
      }
      state.prevPagePos = state.pagePos

      const currEl = pageRefs.current[state.currPageIndex]
      const relScroll = window.pageYOffset - currEl.offsetTop
      state.pagePos = relScroll / currEl.clientHeight
    }

    window.addEventListener("scroll", () => {
      updateScrollState()

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

    updateScrollState()
    state.fuzzyPageIndex = Math.round(state.pagePos)

    window.addEventListener("mousemove", (e) => {
      state.mousePos.set(
        lerp(-1, 1, e.clientX / window.innerWidth),
        lerp(1, -1, e.clientY / window.innerHeight)
      )
    })
  }, [progress])

  return (
    <>
      <Loader progress={progress} />
      <Background>
        <Canvas shadowMap>
          <Scene mainAssetsHaveLoaded={progress === 100} />
        </Canvas>
      </Background>

      {progress === 100 && (
        <PagesContainer>
          {pageData.map((props, i) => (
            <div key={i} ref={(el) => (pageRefs.current[i] = el)}>
              <Page {...props} />
            </div>
          ))}
        </PagesContainer>
      )}
    </>
  )
}
