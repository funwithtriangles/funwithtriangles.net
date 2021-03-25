import { useEffect } from "react"
import {
  AnimationAction,
  AnimationMixer,
  LoadingManager,
  Object3D,
} from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const extraLoader = new GLTFLoader(new LoadingManager())

export function useInjectActions(
  extraActionsUrl: string,
  enable: boolean,
  actions: { [key: string]: AnimationAction },
  ref: React.MutableRefObject<Object3D | undefined>,
  mixer: AnimationMixer
) {
  useEffect(() => {
    if (enable) {
      extraLoader.load(extraActionsUrl, (gltf) => {
        gltf.animations.forEach((clip) => {
          actions[clip.name] = mixer.clipAction(clip, ref.current)
        })
      })
    }
  }, [extraActionsUrl, enable, mixer, actions, ref])
}
