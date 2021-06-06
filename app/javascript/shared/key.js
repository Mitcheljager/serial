import { get } from "svelte/store"
import { page } from "../stores/data.js"
import { theme } from "../stores/theme.js"

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

function setThemeKey(key, value) {
  const newTheme = get(theme)
  newTheme[key] = value
  
  theme.set(newTheme)
}

function getThemeKey(key) {
  return get(theme)[key]
}

function setTypeKey(type, typeIdentifier, key, value) {
  if (type == "element") setElementKey(typeIdentifier[0], typeIdentifier[1], key, value)
  if (type == "section") setSectionKey(typeIdentifier[0], key, value)
  if (type == "theme") getThemeKey(key, value)
}

function getTypeKey(type, typeIdentifier, key) {
  if (type == "element") getElementKey(typeIdentifier[0], typeIdentifier[1], key)
  if (type == "section") getSectionKey(typeIdentifier[0], key)
  if (type == "theme") getThemeKey(key)
}

export {
  getElementKey,
  setElementKey,
  getElementIndex,
  getSectionKey,
  setSectionKey,
  getThemeKey,
  setThemeKey,
  setTypeKey,
  getTypeKey
}
