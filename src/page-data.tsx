type PageData = {
  title: string
  body: string
  justify: string
  camOffset: number
  camOffsetMob: number
  isFullHeightMob?: boolean
}

export const pageData: PageData[] = [
  {
    title: "Hello",
    justify: "flex-end",
    camOffset: 0.25,
    camOffsetMob: 0,
    body: `I'm Alex Kempton, a creative developer and artist 
    working with new technologies to create interesting visual
    experiences. I am the creator of Hedron, visual artist for
    Polyop and creative director at Nudibranch Records. 
    Previous clients include Gucci and Red Bull.`,
  },
  {
    title: "Being playful with technology",
    justify: "flex-start",
    camOffset: -0.25,
    camOffsetMob: 0,
    body: `I'm Alex Kempton, a creative developer and artist 
    working with new technologies to create interesting visual
    experiences. I am the creator of Hedron, visual artist for
    Polyop and creative director at Nudibranch Records. 
    Previous clients include Gucci and Red Bull.`,
  },
  {
    title: "10 Years an Engineer",
    justify: "flex-end",
    camOffset: 0.25,
    camOffsetMob: 0,
    body: `I'm Alex Kempton, a creative developer and artist 
    working with new technologies to create interesting visual
    experiences. I am the creator of Hedron, visual artist for
    Polyop and creative director at Nudibranch Records. 
    Previous clients include Gucci and Red Bull.`,
  },
  {
    title: "Say Hi!",
    justify: "flex-start",
    camOffset: -0.25,
    camOffsetMob: 0,
    isFullHeightMob: true,
    body: `Id love to hear from you.`,
  },
]
