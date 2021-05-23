import { writable } from "svelte/store"

const pages = writable(null)
const page = writable(null)

const currentTab = writable("theme")
const currentSectionIndex = writable(0)
const currentEditable = writable(null)
const currentElement = writable(null)
const hoveringElement = writable(null)
const directUploadUrl = writable("")

export {
  pages,
  page,
  currentSectionIndex,
  currentElement,
  currentEditable,
  hoveringElement,
  currentTab,
  directUploadUrl
}
