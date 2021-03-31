import { useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { PerspectiveCamera, Vector2, Vector3 } from "three"
import { breakpoints, dimensions } from "../constants"
import { pageData } from "../page-data"
import { state } from "../state"
import { usePageDataVector } from "../utils/usePageDataVector"

const easeInOutSin = (t: number) =>
  (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2

const offsetPositions = pageData.map((item) => item.camOffset)
offsetPositions.push(new Vector2()) // Last position still needs a target, so we just give it any old number

const mouseAmp = 0.5
const medBreak = breakpoints.medium

export function Camera() {
  const camera = useRef<PerspectiveCamera>(
    new PerspectiveCamera(75, 0, 0.1, 1000)
  )

  const viewOffset = useRef(new Vector2())
  const pageDimensions = useRef(new Vector2())

  const cylindricalPos = usePageDataVector("camPosition", new Vector3())
  const orbitOffset = usePageDataVector("camOrbitOffset", new Vector3())
  const lookAt = usePageDataVector("camLookAt", new Vector3())

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

    cam.position.setFromCylindricalCoords(
      cylindricalPos.current.x,
      cylindricalPos.current.y,
      cylindricalPos.current.z
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
