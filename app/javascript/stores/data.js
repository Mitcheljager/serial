import { writable } from "svelte/store"

const pages = writable(null)
const page = writable(null)

const currentTab = writable("theme")
const currentSectionIndex = writable(0)
const hoveringElement = writable(null)

export { pages, page, currentSectionIndex, hoveringElement, currentTab }
