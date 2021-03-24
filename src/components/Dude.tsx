import { useAnimations, useGLTF } from "drei"
import { useEffect } from "react"

const modSc = 0.2

export function Dude() {
  const gltfObject = useGLTF("/octobot.glb")
  const { animations } = gltfObject
  gltfObject.scene.scale.set(modSc, modSc, modSc)
  const armature = gltfObject.scene.getObjectByName("Armature")

  armature?.traverse((obj) => {
    obj.frustumCulled = false
    obj.castShadow = true
  })

  const { actions, ref } = useAnimations(animations)

  useEffect(() => {
    actions.strut.play()
  })

  return (
    <>
      <primitive ref={ref} object={gltfObject.scene} />
    </>
  )
}
