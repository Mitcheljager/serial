import { writable } from "svelte/store"

const projects = writable([])
const project = writable({})

export { projects, project }
