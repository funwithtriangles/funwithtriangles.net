import { Vector3, Vector2 } from "three"
import { Intro, Tech, Engineer, Art, Contact } from "./pages"

export type VectorKeys =
  | "camOffset"
  | "camPosition"
  | "camLookAt"
  | "camOrbitOffset"
  | "tvPosition"

export interface PageData {
  id: string
  content: Function
  justify: string
  camOffset: Vector2
  camOffsetMob: number
  isFullHeightMob?: boolean
  camPosition: Vector3 // Cylindrical (rad, theta, y)
  camLookAt: Vector3
  camOrbitOffset: Vector3
  action: string
  tvPosition: Vector3
}

export const pageData: PageData[] = [
  {
    id: "intro",
    justify: "flex-end",
    camOffset: new Vector2(0.25, -0.2),
    camOffsetMob: 0,
    camPosition: new Vector3(3.5, 0, 0.8),
    camLookAt: new Vector3(-1.2, 0.8, 0),
    camOrbitOffset: new Vector3(-1.2, 0, 0),
    content: Intro,
    action: "idle",
    tvPosition: new Vector3(0, 0, 0),
  },
  {
    id: "tech",
    justify: "flex-start",
    camOffset: new Vector2(-0.25, 0),
    camOffsetMob: 0,
    camPosition: new Vector3(1, 0, 2),
    camLookAt: new Vector3(0, 1.1, 0),
    camOrbitOffset: new Vector3(0, 0, 0),
    content: Tech,
    action: "idle",
    tvPosition: new Vector3(-60, 0, 0),
  },
  {
    id: "engineer",
    justify: "flex-end",
    camOffset: new Vector2(0.25, 0.33),
    camOffsetMob: 0,
    camPosition: new Vector3(2, 0, 1),
    camLookAt: new Vector3(0, 1.5, 0),
    camOrbitOffset: new Vector3(0, 0, 0),
    content: Engineer,
    action: "strut",
    tvPosition: new Vector3(-60, 0, 0),
  },
  {
    id: "art",
    justify: "flex-start",
    camOffset: new Vector2(-0.25, -0.2),
    camOffsetMob: 0,
    camPosition: new Vector3(5, Math.PI, 1),
    camLookAt: new Vector3(0, 1, 0),
    camOrbitOffset: new Vector3(0, 0, 0),
    content: Art,
    action: "idle",
    tvPosition: new Vector3(-60, 0, 0),
  },
  {
    id: "contact",
    justify: "flex-end",
    camOffset: new Vector2(0.25, 0),
    camOffsetMob: 0,
    camPosition: new Vector3(2, Math.PI * 2, 1),
    camLookAt: new Vector3(0, 1, 0),
    camOrbitOffset: new Vector3(0, 0, 0),
    isFullHeightMob: true,
    content: Contact,
    action: "chicken",
    tvPosition: new Vector3(-60, 0, 0),
  },
]
