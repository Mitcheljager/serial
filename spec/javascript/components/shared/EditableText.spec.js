import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { render, screen, fireEvent } from "@testing-library/svelte"

import { get, set } from "svelte/store"
import { theme } from "stores/theme"
import { page } from "stores/pages"
import { data } from "../../data"

import EditableText from "components/shared/EditableText.svelte"

const key = "test"
const defaultValue = "Hello"

beforeEach(() => {
  page.set(data)
  theme.set({})
})

afterEach(() => {
  document.body.innerHTML = ""
})

it("Should show text with default value", () => {
  const { getByText } = render(EditableText, { key, defaultValue })

  expect(getByText(defaultValue)).toBeInTheDocument()
})

it("Should show values if properties are set", () => {
  theme.set({ [key]: "Theme value" })
  page.set({
    sections: [{
      elements: [{ uuid: "3", properties: { [key]: "Element value" } }]
    }]
  })

  render(EditableText, { key, defaultValue })
  render(EditableText, { key, element: get(page).sections[0].elements[0] })

  expect(screen.getByText("Theme value")).toBeInTheDocument()
  expect(screen.getByText("Element value")).toBeInTheDocument()
})
