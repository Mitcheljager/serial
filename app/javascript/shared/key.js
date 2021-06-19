import { get } from "svelte/store"
import { page } from "../stores/data.js"
import { theme } from "../stores/theme.js"

function getElementKey(element, key) {
  return element.properties[key]
}

function setElementKey(element, key, value) {
  const newPage = get(page)
  const section = getSectionOfElement(element)
  const sectionIndex = indexOfSection(section)

  newPage.sections[sectionIndex].elements[getElementIndex(sectionIndex, element)].properties[key] = value
  page.set(newPage)
}

function getElementIndex(sectionIndex, element) {
  if (!element) return
  return get(page).sections[sectionIndex]?.elements?.findIndex(e => e.uuid == element.uuid)
}

function getSectionOfElement(element) {
  return get(page).sections.filter(s => s.elements.filter(e => e.uuid == element.uuid).length)[0]
}

function getSectionKey(section, key) {
  return section.properties[key]
}

function setSectionKey(section, key, value) {
  const newPage = get(page)
  const index = indexOfSection(section)

  newPage.sections[index].properties[key] = value
  page.set(newPage)
}

function indexOfSection(section) {
  return get(page).sections.findIndex(s => s.uuid == section.uuid)
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
  if (type == "element") setElementKey(typeIdentifier, key, value)
  if (type == "section") setSectionKey(typeIdentifier, key, value)
  if (type == "theme") setThemeKey(key, value)
}

function getTypeKey(type, typeIdentifier, key) {
  if (type == "element") return getElementKey(typeIdentifier, key)
  if (type == "section") return getSectionKey(typeIdentifier, key)
  if (type == "theme") return getThemeKey(key)
}

export {
  getElementKey,
  setElementKey,
  getElementIndex,
  getSectionKey,
  setSectionKey,
  indexOfSection,
  getThemeKey,
  setThemeKey,
  setTypeKey,
  getTypeKey
}
