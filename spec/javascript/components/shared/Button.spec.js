import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { render, fireEvent } from "@testing-library/svelte"

import { tick } from "svelte"
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

it("Should show button with default value", async () => {
  const { getByText } = render(Button, { key, value })

  await fireEvent.click(getByText(value))

  expect(getByText(value)).toBeInTheDocument()
})

it("Should have active class by default if value is empty", async () => {
  render(Button, { key, value: "" })

  await fireEvent.click(document.querySelector("button"))

  expect(document.querySelector("button").classList.contains("active")).toBe(true)
})

it("Should set theme property and be given active class when clicked", async () => {
  const { getByText } = render(Button, { key, value })

  expect(get(theme).test).toEqual(undefined)
  expect(getByText(value).classList.contains("active")).toBe(false)

  await fireEvent.click(getByText(value))
  await tick()
  
  expect(get(theme).test).toEqual("Hello")
  expect(getByText(value).classList.contains("active")).toBe(true)
})

it("Should set element property if section when clicked", async () => {
  const { getByText } = render(Button, { key, value, element: get(page).sections[0].elements[0] })

  expect(get(page).sections[0].elements[0].properties.test).toEqual(undefined)
  expect(getByText(value).classList.contains("active")).toBe(false)

  await fireEvent.click(getByText(value))

  expect(get(page).sections[0].elements[0].properties.test).toEqual("Hello")
})

it("Should remove and set active class if multiple buttons are present with the same key but different values", async () => {
  render(Button, { key, value: "" })
  render(Button, { key, value: "Other value" })

  const elements = document.querySelectorAll("button")

  expect(elements[0].classList.contains("active")).toBe(true)
  expect(elements[1].classList.contains("active")).toBe(false)

  elements[1].click()
  await tick()

  expect(elements[0].classList.contains("active")).toBe(false)
  expect(elements[1].classList.contains("active")).toBe(true)
})
