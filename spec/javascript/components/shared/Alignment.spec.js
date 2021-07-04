import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { render } from "@testing-library/svelte"

import { get, set } from "svelte/store"
import { theme } from "stores/theme"
import { page } from "stores/pages"
import { data } from "../../data"

import Alignment from "components/shared/Alignment.svelte"

let controlElements

const key = "test"

beforeEach(() => {
  page.set(data)
})

it("Should render 9 control elements", () => {
  render(Alignment, { key })
  controlElements = document.querySelectorAll(".item")

  expect(controlElements.length == 9)
})

it("Should set a different value for each control element when clicked", () => {
  render(Alignment, { key })
  controlElements = document.querySelectorAll(".item")

  let currentValue = get(theme)[key]

  controlElements.forEach(element => {
    element.click()
    expect(JSON.stringify(get(theme)[key]) == JSON.stringify(currentValue)).toBe(false)
    currentValue = get(theme)[key]
  })
})

it("Should set section property if section is given", () => {
  render(Alignment, { key, section: get(page).sections[0] })
  const element = document.querySelector(".item")

  element.click()
  expect(get(page).sections[0].properties[key] != undefined).toBe(true)
})

it("Should set element property if element is given", () => {
  render(Alignment, { key, element: get(page).sections[0].elements[0] })
  const element = document.querySelector(".item")

  element.click()
  expect(get(page).sections[0].elements[0].properties[key] != undefined).toBe(true)
})
