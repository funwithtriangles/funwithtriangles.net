import { useTexture } from "drei"

export function Paintings({ ...props }) {
  const texture = useTexture("sq-wave.jpg")
  return (
    <mesh position={[0, 1, 0]} {...props}>
      <planeBufferGeometry args={[4, 4, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
