import { useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { PerspectiveCamera, Vector3 } from "three"
import { breakpoints, dimensions } from "../constants"
import { pageData } from "../page-data"
import { state } from "../state"

const easeInOutSin = (t: number) =>
  (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2

const offsetPositions = pageData.map((item) => item.camOffset)
offsetPositions.push(0) // Last position still needs a target, so we just give it any old number

const camPositions = pageData.map((item) => item.camPosition)
camPositions.push(new Vector3())

export function Camera() {
  const camera = useRef<PerspectiveCamera>(
    new PerspectiveCamera(75, 0, 0.1, 1000)
  )
  const { setDefaultCamera, size } = useThree()

  useEffect(() => {
    void setDefaultCamera(camera.current)
  })

  useFrame(() => {
    const medBreak = breakpoints.medium
    const fullWidth = size.width
    const fullHeight = size.height
    const currIndex = Math.floor(state.pagePos)
    const start = fullWidth * offsetPositions[currIndex]
    const end = fullWidth * offsetPositions[currIndex + 1]
    const cam = camera.current

    let x = 0
    let y = 0

    const smoothPagePos = easeInOutSin(state.pagePos % 1)

    // Adjust zoom and offset of camera depending on screen size
    if (fullWidth >= medBreak) {
      x = start + (end - start) * smoothPagePos
      cam.zoom = fullWidth / 2 / medBreak
    } else {
      y = (fullHeight - fullWidth * dimensions.mobSceneRatio) / 2
      cam.zoom =
        (fullWidth /
          medBreak /
          (fullHeight / (medBreak * dimensions.mobSceneRatio))) *
        1.2
    }

    cam.setViewOffset(fullWidth, fullHeight, x, y, fullWidth, fullHeight)
    cam.updateProjectionMatrix()

    cam.position.lerpVectors(
      camPositions[currIndex],
      camPositions[currIndex + 1],
      smoothPagePos
    )
  })

  return <perspectiveCamera ref={camera} />
}
