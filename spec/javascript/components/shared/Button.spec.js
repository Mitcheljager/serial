import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { render, screen } from "@testing-library/svelte"

import { get, set } from "svelte/store"
import { theme } from "stores/theme"
import { page } from "stores/pages"
import { data } from "../../data"

import Button from "components/shared/Button.svelte"

const key = "test"
const value = "Hello"

beforeEach(() => {
  page.set(data)

  theme.set({})
})

it("Should show button with default value", () => {
  render(Button, { key, value })

  const element = document.querySelector("button")

  expect(element).toBeInTheDocument()
  expect(screen.getByText(value)).toBeInTheDocument()
})

it("Should have active class by default if value is empty", () => {
  render(Button, { key, value: "" })

  const element = document.querySelector("button")

  expect(element.classList.contains("active")).toBe(true)
})

it("Should set theme property and be given active class when clicked", () => {
  render(Button, { key, value })

  const element = document.querySelector("button")

  expect(get(theme).test).toEqual(undefined)
  expect(element.classList.contains("active")).toBe(false)

  element.click()
  
  setTimeout(() => {
    expect(get(theme).test).toEqual("Hello")
    expect(element.classList.contains("active")).toBe(true)
  })
})

it("Should set section property if section is given and be given active class when clicked", () => {
  render(Button, { key, value, section: get(page).sections[0] })

  const element = document.querySelector("button")

  expect(get(page).sections[0].properties.test).toEqual(undefined)
  expect(element.classList.contains("active")).toBe(false)

  element.click()
  
  setTimeout(() => {
    expect(get(page).sections[0].properties.test).toEqual("Hello")
    expect(element.classList.contains("active")).toBe(true)
  })
})

it("Should set element property if section is given and be given active class when clicked", () => {
  render(Button, { key, value, element: get(page).sections[0].elements[0] })

  const element = document.querySelector("button")

  expect(get(page).sections[0].elements[0].properties.test).toEqual(undefined)
  expect(element.classList.contains("active")).toBe(false)

  element.click()
  
  setTimeout(() => {
    expect(get(page).sections[0].elements[0].properties.test).toEqual("Hello")
    expect(element.classList.contains("active")).toBe(true)
  })
})

it("Should remove and set active class if multiple buttons are present with the same key but different values", () => {
  render(Button, { key, value: "" })
  render(Button, { key, value: "Other value" })

  const elements = document.querySelectorAll("button")

  expect(elements[0].classList.contains("active")).toBe(true)
  expect(elements[1].classList.contains("active")).toBe(false)

  elements[1].click()
  
  setTimeout(() => {
    expect(elements[0].classList.contains("active")).toBe(false)
    expect(elements[1].classList.contains("active")).toBe(true)
  })
})
