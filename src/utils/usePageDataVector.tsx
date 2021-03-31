import { useEffect, useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Vector2, Vector3 } from "three"
import { pageData, VectorKeys } from "../page-data"
import { state } from "../state"

const easeInOutSin = (t: number) =>
  (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2

export function usePageDataVector(id: VectorKeys, vector: Vector2 | Vector3) {
  const vec = useRef<any>(vector)

  const items = useRef<typeof vector[]>([])

  useEffect(() => {
    items.current = pageData.map((item) => item[id])
    items.current.push(items.current[0]) // Need this extra item so last position can lerp beyond that if scrolled 1px too far
  }, [id])

  useFrame(() => {
    const smoothPagePos = easeInOutSin(state.pagePos % 1)

    vec.current.lerpVectors(
      items.current[state.currPageIndex],
      items.current[state.currPageIndex + 1],
      smoothPagePos
    )
  })

  return vec
}
