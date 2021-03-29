const editly = require("editly")

const clips = [
  "octo",
  "werm",
  "rbl",
  "ghosts-dev",
  "rainbow",
  "tape",
  "stigmergy",
  "smoke",
]

const config = {
  outPath: "public/video/showreel.mp4",
  width: 512,
  height: 512,
  clips: clips.map((item) => ({
    transition: null,
    layers: [
      {
        type: "video",
        resizeMode: "cover",
        path: `clips/${item}.mp4`,
      },
    ],
  })),
}

editly(config).catch(console.error)
