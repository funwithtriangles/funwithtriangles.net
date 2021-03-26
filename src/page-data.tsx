import { Vector3 } from "three"

type PageData = {
  title: string
  body: string
  justify: string
  camOffset: number
  camOffsetMob: number
  isFullHeightMob?: boolean
  camPosition: Vector3 // Cylindrical (rad, theta, y)
  camLookAt: Vector3
  action: string
}

export const pageData: PageData[] = [
  {
    title: "Hello",
    justify: "flex-end",
    camOffset: 0.25,
    camOffsetMob: 0,
    camPosition: new Vector3(3, 0, 0.8),
    camLookAt: new Vector3(0, 0.8, 0),
    body: `I'm Alex Kempton, a creative developer and artist 
    working with new technologies to create interesting visual
    experiences. I am the creator of Hedron, visual artist for
    Polyop and creative director at Nudibranch Records. 
    Previous clients include Gucci and Red Bull.`,
    action: "idle",
  },
  {
    title: "Being playful with technology",
    justify: "flex-start",
    camOffset: -0.25,
    camOffsetMob: 0,
    camPosition: new Vector3(1, 0, 2),
    camLookAt: new Vector3(0, 1.1, 0),
    body: `I'm Alex Kempton, a creative developer and artist 
    working with new technologies to create interesting visual
    experiences. I am the creator of Hedron, visual artist for
    Polyop and creative director at Nudibranch Records. 
    Previous clients include Gucci and Red Bull.`,
    action: "idle",
  },
  {
    title: "10 Years an Engineer",
    justify: "flex-end",
    camOffset: 0.25,
    camOffsetMob: 0,
    camPosition: new Vector3(2, 0, 1),
    camLookAt: new Vector3(0, 1, 0),
    body: `I'm Alex Kempton, a creative developer and artist 
    working with new technologies to create interesting visual
    experiences. I am the creator of Hedron, visual artist for
    Polyop and creative director at Nudibranch Records. 
    Previous clients include Gucci and Red Bull.`,
    action: "strut",
  },
  {
    title: "Making Art for Music",
    justify: "flex-start",
    camOffset: -0.25,
    camOffsetMob: 0,
    camPosition: new Vector3(5, Math.PI, 0.2),
    camLookAt: new Vector3(0, 1.5, 0),
    body: `I'm Alex Kempton, a creative developer and artist 
    working with new technologies to create interesting visual
    experiences. I am the creator of Hedron, visual artist for
    Polyop and creative director at Nudibranch Records. 
    Previous clients include Gucci and Red Bull.`,
    action: "idle",
  },
  {
    title: "Say Hi!",
    justify: "flex-end",
    camOffset: 0.25,
    camOffsetMob: 0,
    camPosition: new Vector3(2, Math.PI * 2, 1),
    camLookAt: new Vector3(0, 1, 0),
    isFullHeightMob: true,
    body: `Id love to hear from you.`,
    action: "chicken",
  },
]
