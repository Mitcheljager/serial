import { writable, derived, get } from "svelte/store"

const pages = writable([
  {
    id: 1,
    title: "Test"
  },
  {
    id: 2,
    title: "Test 2"
  },
  {
    id: 3,
    title: "Test 3"
  },
  {
    id: 4,
    title: "Test 4 with a longer title"
  }
])

const page = writable({
  id: 1,
  sections: [
    {
      id: 1,
      properties: [],
      elements: [
        {
          id: 1,
          type: "heading",
          properties: { content: "Test title"  }
        },
        {
          id: 2,
          type: "columns",
          properties: { content_1: "Test column 1 content", content_2: "Abc", title_1: "Test title" }
        }
      ]
    }
  ]
})

const currentSectionIndex = writable(0)
const hoveringElement = writable(null)

export { pages, page, currentSectionIndex, hoveringElement }
