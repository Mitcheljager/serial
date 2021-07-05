import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { render, screen, fireEvent } from "@testing-library/svelte"

import { tick } from "svelte"
import { get, set } from "svelte/store"
import { theme } from "stores/theme"
import { page } from "stores/pages"
import { editMode } from "stores/user"
import { data } from "../../data"

import EditableButton from "components/shared/EditableButton.svelte"

const key = "test"

beforeEach(() => {
  page.set(data)
  theme.set({})
})

afterEach(() => {
  document.body.innerHTML = ""
})

it("Should show button with default value", () => {
  const { getByText } = render(EditableButton, { key })

  expect(getByText("Link")).toBeInTheDocument()
})

it("Should show values if properties are set", () => {
  theme.set({ [key]: { label: "Theme", link: "https://test.com/", size: "large" } })
  page.set({
    sections: [{
      elements: [{ uuid: "3", properties: { test: { label: "Element", link: "https://test.com/", size: "large" } } }]
    }]
  })

  render(EditableButton, { key })
  render(EditableButton, { key, element: get(page).sections[0].elements[0] })

  expect(screen.getByText("Theme")).toBeInTheDocument()
  expect(screen.getByText("Theme")).toHaveAttribute("href", "https://test.com/")
  expect(screen.getByText("Element")).toBeInTheDocument()
  expect(screen.getByText("Element")).toHaveAttribute("href", "https://test.com/")
})
