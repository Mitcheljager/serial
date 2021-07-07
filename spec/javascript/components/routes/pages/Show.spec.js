import "jsdom-global/register"
import "@testing-library/jest-dom/extend-expect"

import { getByText, render, screen } from "@testing-library/svelte"

import { tick } from "svelte"
import { get } from "svelte/store"
import { page, pages } from "stores/pages"
import { theme } from "stores/theme"

import Show from "components/routes/pages/Show.svelte"

beforeAll(() => {
  render(Show, { 
    data: {
      page: JSON.stringify({
        uuid: "1",
        title: "About",
        sections: [{
          uuid: "4",
          elements: [{
            uuid: "5",
            content_type: "call_to_action",
            properties: { title: "Title" }
          }]
        }]
      }),
      pages: JSON.stringify([{ uuid: "1", title: "Test" }, { uuid: "2", title: "Test" }]),
      theme: JSON.stringify({ navigation: { pages: { type: "internal", uuid: "1" } } })
    }
  })
})

it("Should set values on load when not in edit mode", () => {
  expect(get(page).uuid).toBeTruthy()
  expect(get(pages).length).toBeTruthy()
  expect(get(theme).navigation.pages).toBeTruthy()
})
