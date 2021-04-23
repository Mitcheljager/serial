import { get } from "svelte/store"
import { page } from "../stores/data.js"

function getElementKey(sectionIndex, element, key) {
  return get(page).sections[sectionIndex]?.elements[getElementIndex(sectionIndex, element)]?.properties[key]
}

function setElementKey(sectionIndex, element, key, value) {
  const newPage = get(page)
  newPage.sections[sectionIndex].elements[getElementIndex(sectionIndex, element)].properties[key] = value

  page.set(newPage)
}

function getElementIndex(sectionIndex, element) {
  if (!element) return
  return get(page).sections[sectionIndex]?.elements?.findIndex(e => e.uuid == element.uuid)
}

function getSectionKey(index, key) {
  return get(page).sections[index].properties[key]
}

function setSectionKey(index, key, value) {
  const newPage = get(page)
  newPage.sections[index].properties[key] = value

  page.set(newPage)
}

export { getElementKey, setElementKey, getSectionKey, setSectionKey, getElementIndex }
