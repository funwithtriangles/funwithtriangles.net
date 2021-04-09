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
  const viewOffsetMobAdjust = useRef(new Vector2())
  const pageDimensions = useRef(new Vector2())

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
    pageDimensions.current.set(size.width, size.height)
    const cam = camera.current

    // Use horizontal fov instead of vertical
    const hfov = size.width >= medBreak ? 105 : 60
    cam.fov =
      (Math.atan(Math.tan((hfov * Math.PI) / 360) / cam.aspect) * 360) / Math.PI

    if (size.width >= medBreak) {
      viewOffsetMed.current.multiply(pageDimensions.current)

      viewOffset.current.copy(viewOffsetMed.current)
    } else {
      viewOffsetMobAdjust.current.set(
        0,
        (size.height - size.width * dimensions.mobSceneRatio) / 2
      )
      viewOffsetMob.current
        .multiply(pageDimensions.current)
        .add(viewOffsetMobAdjust.current)

      viewOffset.current.copy(viewOffsetMob.current)
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
