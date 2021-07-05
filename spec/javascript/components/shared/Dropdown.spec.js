import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { render, fireEvent } from "@testing-library/svelte"

import Dropdown from "components/shared/Dropdown.svelte"

it("Should open when clicked", async () => {
  const { getByText } = render(Dropdown)

  await fireEvent.click(getByText("Label"))
  
  const element = document.querySelector(".dropdown")
  expect(element.classList.contains("active")).toBe(true)
})
