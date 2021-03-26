import { useEffect, useRef } from "react"
import { useFrame } from "react-three-fiber"
import {
  LoadingManager,
  MeshBasicMaterial,
  Object3D,
  PlaneBufferGeometry,
  sRGBEncoding,
  TextureLoader,
  Vector3,
} from "three"
import { state } from "../state"
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
const galleryWidth = (sideLength + gutter) * numFrames

const texLoader = new TextureLoader(new LoadingManager())

type SingleProps = {
  material: MeshBasicMaterial
  position: [number, number, number]
}

const geom = new PlaneBufferGeometry(sideLength, sideLength, 1, 1)

function Single({ material, position }: SingleProps) {
  const basePos = useRef(new Vector3(...position))
  const velocity = useRef(new Vector3(0, 0, 0))
  const activePos = useRef(new Vector3())
  const mesh = useRef(new Object3D())

  useFrame((_, delta) => {
    velocity.current.x = -state.mousePos.x * 0.1
    activePos.current.add(velocity.current)

    mesh.current.position.addVectors(basePos.current, activePos.current)

    if (mesh.current.position.x > galleryWidth / 2) {
      activePos.current.x -= galleryWidth
    } else if (mesh.current.position.x < -galleryWidth / 2) {
      activePos.current.x += galleryWidth
    }
  })

  return <mesh ref={mesh} geometry={geom} material={material} />
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
