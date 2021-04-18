import { writable } from "svelte/store"

const globalError = writable("")

export { globalError }
