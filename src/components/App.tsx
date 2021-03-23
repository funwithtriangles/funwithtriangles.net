import { useEffect } from "react"
import { Canvas } from "react-three-fiber"
import { Page } from "./Page"
import { Scene } from "./Scene"
import { pageData } from "../page-data"

import { state } from "../state"

import "./App.css"

export function App() {
  useEffect(() => {
    window.onscroll = () => {
      state.pagePos = window.pageYOffset / window.innerHeight
    }
  }, [])

  return (
    <>
      <div className="background">
        <Canvas>
          <Scene />
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
