import { writable } from "svelte/store"

const currentUser = writable({})
const settings = writable({ show_help_text: true })

export { currentUser, settings }
