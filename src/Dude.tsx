import { useLoader } from "react-three-fiber"

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export function Dude() {
  const gltfObject = useLoader(GLTFLoader, "/octoboy.glb")

  return <primitive object={gltfObject.scene} />
}
