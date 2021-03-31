import { useAnimations, useGLTF } from "drei"
import { useEffect, useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import {
  Mesh,
  MeshBasicMaterial,
  sRGBEncoding,
  Vector3,
  VideoTexture,
} from "three"
import { pageData } from "../page-data"
import { state } from "../state"
import { useInjectActions } from "../utils/useInjectActions"
import { usePageDataVector } from "../utils/usePageDataVector"

const modSc = 0.2
const blendDuration = 1

type DudeProps = {
  loadExtraAssets: boolean
}

const video = document.createElement("video")
video.muted = true
video.loop = true
video.src = "video/showreel.mp4"
video.play()

const videoTex = new VideoTexture(video)
const screenMat = new MeshBasicMaterial({ map: videoTex })
videoTex.encoding = sRGBEncoding
screenMat.toneMapped = false

export function Dude({ loadExtraAssets }: DudeProps) {
  const gltfObject = useGLTF("models/octobot.glb")
  const { animations } = gltfObject
  const { actions, ref, mixer } = useAnimations(animations)
  const [currAction, setCurrAction] = useState("idle")
  const tv = useRef<Mesh>()

  useEffect(() => {
    gltfObject.scene.scale.set(modSc, modSc, modSc)
    const armature = gltfObject.scene.getObjectByName("Armature")

    armature?.traverse((obj) => {
      obj.frustumCulled = false
      obj.castShadow = true
    })

    tv.current = gltfObject.scene.getObjectByName("tv") as Mesh

    tv.current.traverse((obj) => {
      obj.frustumCulled = false
      obj.castShadow = true
    })

    const screen = gltfObject.scene.getObjectByName("tvscreen") as Mesh
    screen.material = screenMat
  })

  const tvPosition = usePageDataVector("tvPosition", new Vector3())

  useFrame(() => {
    const page = pageData[state.fuzzyPageIndex]
    const actionName = page.action

    // Set animation for dude
    if (actions[actionName] !== undefined) {
      setCurrAction(actionName)
    } else {
      // If action hasn't loaded yet, fall back to "idle" action
      setCurrAction("idle")
    }

    // Move TV based on page data
    if (tv.current) {
      tv.current.position.copy(tvPosition.current)
      // Hide TV once it's out of the shot
      tv.current.visible = tv.current.position.x > -40
    }
  })

  useEffect(() => {
    // Update action when currAction updates
    actions[currAction].reset().fadeIn(blendDuration).play()
    return () => void actions[currAction].fadeOut(blendDuration)
  }, [currAction, actions])

  useInjectActions(
    "models/extra-actions.glb",
    loadExtraAssets,
    actions,
    ref,
    mixer
  )

  return (
    <>
      <primitive ref={ref} object={gltfObject.scene} />
    </>
  )
}
