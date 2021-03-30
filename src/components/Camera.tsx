import { useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { PerspectiveCamera, Vector2, Vector3 } from "three"
import { breakpoints, dimensions } from "../constants"
import { pageData } from "../page-data"
import { state } from "../state"

const easeInOutSin = (t: number) =>
  (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2

const offsetPositions = pageData.map((item) => item.camOffset)
offsetPositions.push(new Vector2()) // Last position still needs a target, so we just give it any old number

const camPositions = pageData.map((item) => item.camPosition)
camPositions.push(new Vector3())

const lookAtPositions = pageData.map((item) => item.camLookAt)
lookAtPositions.push(new Vector3())

const orbitOffsets = pageData.map((item) => item.camOrbitOffset)
orbitOffsets.push(new Vector3())

const mouseAmp = 0.5
const medBreak = breakpoints.medium

export function Camera() {
  const camera = useRef<PerspectiveCamera>(
    new PerspectiveCamera(75, 0, 0.1, 1000)
  )

  const cylindricalPos = useRef(new Vector3())
  const orbitOffset = useRef(new Vector3())
  const pageDimensions = useRef(new Vector2())
  const viewOffset = useRef(new Vector2())

  const lookAt = useRef(new Vector3())
  const { setDefaultCamera, size } = useThree()

  useEffect(() => {
    void setDefaultCamera(camera.current)
  })

  useFrame(() => {
    pageDimensions.current.set(size.width, size.height)
    const cam = camera.current

    const smoothPagePos = easeInOutSin(state.pagePos % 1)

    // Adjust zoom and offset of camera depending on screen size
    // TODO: This is actually the formula for zooming mobile, which works pretty well but probably not exact
    cam.zoom =
      size.width /
      medBreak /
      (size.width / (medBreak * dimensions.mobSceneRatio))

    if (size.width >= medBreak) {
      viewOffset.current
        .lerpVectors(
          offsetPositions[state.currPageIndex],
          offsetPositions[state.currPageIndex + 1],
          smoothPagePos
        )
        .multiply(pageDimensions.current)
    } else {
      viewOffset.current.set(
        0,
        (size.height - size.width * dimensions.mobSceneRatio) / 2
      )
      cam.zoom *= 1.2
    }

    lookAt.current.lerpVectors(
      lookAtPositions[state.currPageIndex],
      lookAtPositions[state.currPageIndex + 1],
      smoothPagePos
    )

    cylindricalPos.current.lerpVectors(
      camPositions[state.currPageIndex],
      camPositions[state.currPageIndex + 1],
      smoothPagePos
    )

    cam.position.setFromCylindricalCoords(
      cylindricalPos.current.x,
      cylindricalPos.current.y,
      cylindricalPos.current.z
    )

    orbitOffset.current.lerpVectors(
      orbitOffsets[state.currPageIndex],
      orbitOffsets[state.currPageIndex + 1],
      smoothPagePos
    )

    // Damped orbit based on mouse pos
    cam.position.x += state.mousePos.x * mouseAmp
    cam.position.y += state.mousePos.y * mouseAmp

    cam.position.add(orbitOffset.current)

    cam.lookAt(lookAt.current)

    cam.setViewOffset(
      size.width,
      size.height,
      viewOffset.current.x,
      viewOffset.current.y,
      size.width,
      size.height
    )
    cam.updateProjectionMatrix()
  })

  return <perspectiveCamera ref={camera} />
}
