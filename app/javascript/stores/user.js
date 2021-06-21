import { writable } from "svelte/store"

const currentUser = writable({})
const settings = writable({ show_help_text: true })
const editMode = writable(false)

export { currentUser, settings, editMode }
