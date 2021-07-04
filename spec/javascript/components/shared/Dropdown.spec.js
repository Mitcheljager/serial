import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { render, screen } from "@testing-library/svelte"

import Dropdown from "components/shared/Dropdown.svelte"

it("Should open when clicked", () => {
  render(Dropdown)

  const element = document.querySelector(".dropdown")
  const label = screen.getByText("Label")

  label.click()

  setTimeout(() => {
    expect(element.classList.contains("active")).toBe(true)

    label.click()
  })
})
