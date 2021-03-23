import { useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { PerspectiveCamera, Vector3 } from "three"
import { breakpoints } from "../constants"
import { pageData } from "../page-data"
import { state } from "../state"

const easeInOutSin = (t: number) =>
  (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2

const offsetPositions = pageData.map((item) => item.camOffset)
offsetPositions.push(0) // Last position still needs a target, so we just give it any old number

const camPositions = pageData.map((item) => item.camPosition)
camPositions.push(new Vector3())

export function Camera() {
  const ref = useRef<PerspectiveCamera>(new PerspectiveCamera(75, 0, 0.1, 1000))
  const { setDefaultCamera, size } = useThree()

  useEffect(() => {
    void setDefaultCamera(ref.current)
  })

  useFrame(() => {
    const fullWidth = size.width
    const fullHeight = size.height
    const currIndex = Math.floor(state.pagePos)
    const start = fullWidth * offsetPositions[currIndex]
    const end = fullWidth * offsetPositions[currIndex + 1]

    let x = 0
    let y = 0

    const smoothPagePos = easeInOutSin(state.pagePos % 1)

    if (fullWidth >= breakpoints.medium) {
      x = start + (end - start) * smoothPagePos
    } else {
      y = fullHeight * 0.25
    }

    ref.current.setViewOffset(
      fullWidth,
      fullHeight,
      x,
      y,
      fullWidth,
      fullHeight
    )
    ref.current.updateProjectionMatrix()

    ref.current.position.lerpVectors(
      camPositions[currIndex],
      camPositions[currIndex + 1],
      smoothPagePos
    )
  })

  return <perspectiveCamera ref={ref} />
}
