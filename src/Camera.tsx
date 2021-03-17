import { useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { PerspectiveCamera } from "three"

const easeInOutSin = (t: number) =>
  (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2

const offsetPositions = [-0.25, 0.25, 0, 0]

export function Camera({ xOffset }: { xOffset: number }) {
  const ref = useRef<PerspectiveCamera>(new PerspectiveCamera(75, 0, 0.1, 1000))
  const { setDefaultCamera } = useThree()
  useEffect(() => {
    ref.current.position.z = 1
    void setDefaultCamera(ref.current)
  })

  useFrame(() => {
    const fullWidth = window.innerWidth
    const fullHeight = window.innerHeight
    const currIndex = Math.floor(xOffset)
    const start = fullWidth * offsetPositions[currIndex]
    const end = fullWidth * offsetPositions[currIndex + 1]

    const x = start + (end - start) * easeInOutSin(xOffset % 1)

    ref.current.setViewOffset(
      fullWidth,
      fullHeight,
      x,
      0,
      fullWidth,
      fullHeight
    )
    ref.current.updateProjectionMatrix()
  })

  return <perspectiveCamera ref={ref} />
}
