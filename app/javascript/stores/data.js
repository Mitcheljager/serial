import { writable } from "svelte/store"

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
      elements: [
        {
          type: "heading",
          properties: { content: "Test title"  }
        },
        {
          type: "columns",
          properties: { content_1: "Test column 1 content", content_2: "Abc", title_1: "Test title" }
        }
      ]
    }
  ]
})

const currentSectionId = writable(1)

export { pages, page, currentSectionId }
