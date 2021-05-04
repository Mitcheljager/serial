import { writable } from "svelte/store"

const pages = writable(null)
const page = writable(null)

const currentTab = writable("theme")
const currentSectionIndex = writable(0)
const currentEditableButton = writable(null)
const currentEditableText = writable(null)
const currentElement = writable(null)
const hoveringElement = writable(null)

export { pages, page, currentSectionIndex, currentElement, currentEditableButton, currentEditableText, hoveringElement, currentTab }
