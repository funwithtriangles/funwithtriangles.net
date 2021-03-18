import { useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { PerspectiveCamera } from "three"
import { breakpoints } from "./constants"
import { pageData } from "./page-data"

const easeInOutSin = (t: number) =>
  (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2

const offsetPositions = pageData.map((item) => item.camOffset)
offsetPositions.push(0) // Last position still needs a target, so we just give it any old number

export function Camera({ xOffset }: { xOffset: number }) {
  const ref = useRef<PerspectiveCamera>(new PerspectiveCamera(75, 0, 0.1, 1000))
  const { setDefaultCamera, size } = useThree()
  useEffect(() => {
    ref.current.position.set(0, 1, 3)
    void setDefaultCamera(ref.current)
  })

  useFrame(() => {
    const fullWidth = size.width
    const fullHeight = size.height
    const currIndex = Math.floor(xOffset)
    const start = fullWidth * offsetPositions[currIndex]
    const end = fullWidth * offsetPositions[currIndex + 1]

    let x = 0
    let y = 0

    if (fullWidth >= breakpoints.medium) {
      x = start + (end - start) * easeInOutSin(xOffset % 1)
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
  })

  return <perspectiveCamera ref={ref} />
}
