import { Vector2 } from "three"

export const state = {
  pagePos: 0,
  currPageIndex: 0,
  fuzzyPageIndex: 0, // page index that switches a bit early
  prevPageIndex: 0,
  prevPagePos: 0,
  mousePos: new Vector2(),
}
