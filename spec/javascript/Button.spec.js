import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { render } from "@testing-library/svelte"

import Button from "components/shared/Button.svelte" 

test("Should show button with default slot", () => {
  const { getByText } = render(Button, { key: "test", value: "Hello" })

  expect(getByText("Button")).toBeInTheDocument()
})
