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
    title: "Test 4"
  }
])

const page = writable([
  {
    id: 1
  }
])

export { pages, page }
