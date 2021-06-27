import { get } from "svelte/store"
import { pages } from "../stores/pages.js"

export function getPageByUUID(uuid) {
  if (get(pages) && get(pages).length) return get(pages).filter(p => p.uuid == uuid)[0]
}
