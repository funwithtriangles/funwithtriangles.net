import { useTexture } from "drei"
import { DoubleSide, Vector3 } from "three"

const path = "artwork"
const files = [
  "molecular-main.jpg",
  "sulkin-birds.jpg",
  "sq-wave.jpg",
  "lanquidity.jpg",
  "molecular-threads.jpg",
  "donttoucheyes.jpg",
  "leapwerm.jpg",
]
const sideLength = 8
const gutter = 1
const numFrames = 28 // We're swapping textures so this doesn't need to match number of files

type SingleProps = {
  textureUrl: string
  position: [number, number, number]
}

function Single({ textureUrl, position }: SingleProps) {
  const texture = useTexture(textureUrl)
  return (
    <mesh position={position}>
      <planeBufferGeometry args={[sideLength, sideLength, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

const tempList = new Array(numFrames).fill(0)

export function Paintings({ ...props }) {
  return (
    <group {...props} position={[0, sideLength / 2 + 1, 5]}>
      {tempList.map((_, index) => {
        const x =
          (sideLength + gutter) * index -
          (sideLength + gutter) * Math.floor(numFrames / 2)
        return (
          <Single
            key={index}
            textureUrl={`${path}/${files[index % files.length]}`}
            position={[x, 0, 0]}
          />
        )
      })}
    </group>
  )
}
