import { useAnimations, useGLTF } from "drei"
import { useEffect, useState } from "react"
import { useFrame } from "react-three-fiber"
import { pageData } from "../page-data"
import { state } from "../state"

const modSc = 0.2
const blendDuration = 1

export function Dude() {
  const gltfObject = useGLTF("/octobot.glb")
  const { animations } = gltfObject

  const { actions, ref } = useAnimations(animations)

  const [currAction, setCurrAction] = useState("waving")

  useEffect(() => {
    gltfObject.scene.scale.set(modSc, modSc, modSc)
    const armature = gltfObject.scene.getObjectByName("Armature")

    armature?.traverse((obj) => {
      obj.frustumCulled = false
      obj.castShadow = true
    })
  })

  useFrame(() => {
    setCurrAction(pageData[state.fuzzyPageIndex].action)
  })

  useEffect(() => {
    actions[currAction].reset().fadeIn(blendDuration).play()
    return () => void actions[currAction].fadeOut(blendDuration)
  }, [currAction, actions])

  return (
    <>
      <primitive ref={ref} object={gltfObject.scene} />
    </>
  )
}
