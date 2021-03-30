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

const tvShowPos = new Vector3(0, 0, 0)
const tvHidePos = new Vector3(0, 40, 0)

export function Dude({ loadExtraAssets }: DudeProps) {
  const gltfObject = useGLTF("models/octobot.glb")
  const { animations } = gltfObject
  const { actions, ref, mixer } = useAnimations(animations)
  const [currAction, setCurrAction] = useState("idle")
  const tv = useRef<Mesh>()

  useEffect(() => {
    const page = pageData[state.fuzzyPageIndex]

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

    if (page.id !== "intro") {
      tv.current.position.copy(tvHidePos)
    }

    const screen = gltfObject.scene.getObjectByName("tvscreen") as Mesh
    screen.material = screenMat
  })

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

    // Only show TV for intro
    if (tv.current) {
      if (page.id === "intro") {
        tv.current.position.lerp(tvShowPos, 0.05)
      } else {
        tv.current.position.lerp(tvHidePos, 0.02)
      }
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
