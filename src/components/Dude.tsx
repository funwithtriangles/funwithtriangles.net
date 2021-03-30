import { useAnimations, useGLTF } from "drei"
import { useEffect, useState } from "react"
import { useFrame } from "react-three-fiber"
import { Mesh, MeshBasicMaterial, sRGBEncoding, VideoTexture } from "three"
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

export function Dude({ loadExtraAssets }: DudeProps) {
  const gltfObject = useGLTF("models/octobot.glb")
  const { animations } = gltfObject
  const { actions, ref, mixer } = useAnimations(animations)
  const [currAction, setCurrAction] = useState("idle")

  useEffect(() => {
    gltfObject.scene.scale.set(modSc, modSc, modSc)
    const armature = gltfObject.scene.getObjectByName("Armature")

    armature?.traverse((obj) => {
      obj.frustumCulled = false
      obj.castShadow = true
    })

    const screen = gltfObject.scene.getObjectByName("tvscreen") as Mesh
    screen.material = screenMat
  })

  useFrame(() => {
    const actionName = pageData[state.fuzzyPageIndex].action
    if (actions[actionName] !== undefined) {
      setCurrAction(actionName)
    } else {
      // If action hasn't loaded yet, fall back to "idle" action
      setCurrAction("idle")
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
