import { writable } from "svelte/store"

const currentTab = writable("theme")
const currentSectionIndex = writable(0)
const currentEditable = writable(null)
const currentElement = writable(null)
const hoveringElement = writable(null)
const directUploadUrl = writable("")
const imageUrl = writable("https://cdn.workshop.codes/")

export {
  currentSectionIndex,
  currentElement,
  currentEditable,
  hoveringElement,
  currentTab,
  directUploadUrl,
  imageUrl
}
