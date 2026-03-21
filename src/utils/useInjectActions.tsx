import { useEffect, useRef } from "react"
import {
  AnimationAction,
  AnimationMixer,
  LoadingManager,
  Object3D,
} from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const extraLoader = new GLTFLoader(new LoadingManager())

export function useInjectActions(
  extraActionsUrl: string,
  enable: boolean,
  mixer: AnimationMixer,
  root: React.RefObject<Object3D | null | undefined>
) {
  const extraActions = useRef<{ [key: string]: AnimationAction }>({})

  useEffect(() => {
    if (enable && root.current) {
      extraLoader.load(extraActionsUrl, (gltf) => {
        gltf.animations.forEach((clip) => {
          extraActions.current[clip.name] = mixer.clipAction(clip, root.current!)
        })
      })
    }
  }, [extraActionsUrl, enable, mixer, root])

  return extraActions
}
