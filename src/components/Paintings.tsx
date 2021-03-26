import { useEffect, useRef } from "react"
import { useFrame } from "react-three-fiber"
import {
  BoxBufferGeometry,
  LoadingManager,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  sRGBEncoding,
  TextureLoader,
  Vector3,
} from "three"

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
const numFrames = 28 // We're repeating textures
const galleryWidth = sideLength * numFrames

const texLoader = new TextureLoader(new LoadingManager())

const frameMat = new MeshStandardMaterial()

type SingleProps = {
  material: MeshBasicMaterial
  position: [number, number, number]
}

const geom = new BoxBufferGeometry(sideLength, sideLength, 0.2)

function Single({ material, position }: SingleProps) {
  const basePos = useRef(new Vector3(...position))
  const velocity = useRef(new Vector3(0, 0, 0))
  const activePos = useRef(new Vector3())
  const mesh = useRef(new Object3D())

  useFrame((state, delta) => {
    activePos.current.add(velocity.current)

    mesh.current.position.addVectors(basePos.current, activePos.current)
  })

  return (
    <mesh
      ref={mesh}
      geometry={geom}
      material={[frameMat, frameMat, frameMat, frameMat, material, frameMat]}
    />
  )
}

const tempList = new Array(numFrames).fill(0)

function Gallery() {
  const mats = useRef<MeshBasicMaterial[]>([])

  useEffect(() => {
    files.forEach((file) => {
      const tex = texLoader.load(`artwork/${file}`)
      const mat = new MeshBasicMaterial({ map: tex })

      tex.encoding = sRGBEncoding
      mat.toneMapped = false

      mats.current.push(mat)
    })
  }, [])

  return (
    <>
      {tempList.map((_, index) => {
        const x =
          (sideLength + gutter) * index -
          (sideLength + gutter) * Math.floor(numFrames / 2)
        return (
          <Single
            key={index}
            material={mats.current[index % mats.current.length]}
            position={[x, 0, 0]}
          />
        )
      })}
    </>
  )
}

export function Paintings({ ...props }) {
  return (
    <group {...props} position={[0, sideLength / 2 + 1, 5]}>
      {props.loadGallery && <Gallery />}
    </group>
  )
}
