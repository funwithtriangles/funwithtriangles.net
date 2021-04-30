import { useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { PerspectiveCamera, Vector2, Vector3 } from "three"
import { breakpoints, dimensions } from "../constants"
import { state } from "../state"
import { usePageDataVector } from "../utils/usePageDataVector"

const mouseAmp = 0.5
const medBreak = breakpoints.medium

export function Camera() {
  const camera = useRef<PerspectiveCamera>(new PerspectiveCamera())
  const viewOffset = useRef(new Vector2())
  const viewOffsetAdjust = useRef(new Vector2())
  const sceneDimensions = useRef(new Vector2())

  // Fair play, hooks are pretty awesome!
  const viewOffsetMob = usePageDataVector("camOffsetMob", new Vector3())
  const viewOffsetMed = usePageDataVector("camOffset", new Vector3())
  const cylindricalPos = usePageDataVector("camPosition", new Vector3())
  const orbitOffset = usePageDataVector("camOrbitOffset", new Vector3())
  const lookAt = usePageDataVector("camLookAt", new Vector3())

  const { setDefaultCamera, size } = useThree()

  useEffect(() => {
    void setDefaultCamera(camera.current)
  })

  useFrame(() => {
    const cam = camera.current

    // Use horizontal fov instead of vertical
    const hfov = size.width >= medBreak ? 105 : 60
    cam.fov =
      (Math.atan(Math.tan((hfov * Math.PI) / 360) / cam.aspect) * 360) / Math.PI

    if (size.width >= medBreak) {
      // Resizing based on a target aspect ratio, so only changing width of window affects sizings / offsets
      const sceneHeight = size.width * dimensions.sceneRatio
      sceneDimensions.current.set(size.width / 2, sceneHeight)
      viewOffsetMed.current.multiply(sceneDimensions.current)

      viewOffset.current.copy(viewOffsetMed.current)
    } else {
      // Resizing based on a target aspect ratio, so only changing width of window affects sizings / offsets
      const sceneHeight = size.width * dimensions.mobSceneRatio
      sceneDimensions.current.set(size.width, sceneHeight)

      // With mob we have to an extra vertical adjustment
      viewOffsetAdjust.current.set(0, (size.height - sceneHeight) / 2)
      viewOffsetMob.current
        .multiply(sceneDimensions.current)
        .add(viewOffsetAdjust.current)

      viewOffset.current.copy(viewOffsetMob.current)
    }

    cam.position.setFromCylindricalCoords(
      cylindricalPos.current.x,
      cylindricalPos.current.y,
      cylindricalPos.current.z
    )

    if (size.width >= medBreak) {
      // Damped orbit based on mouse pos
      cam.position.x += state.mousePos.x * mouseAmp
      cam.position.y += state.mousePos.y * mouseAmp
    }

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
