import { writable } from "svelte/store"
import RailsFetch from "../shared/railsFetch"

const page = writable()
const pages = writable(null)

function fetchPage() {
  const loading = writable(false)
  const error = writable("")

  async function get(project_id, uuid) {
    loading.set(true)
    error.set(false)
    
    new RailsFetch("/page", {
      project_id: project_id,
      uuid: uuid
    }).post()
    .then(data => {
      loading.set(false)
      page.set(JSON.parse(data))
    })
    .catch(e => error.set(e))
    .finally(() => loading.set(false))
  }

  return [loading, error, get]
}

function fetchPages() {
  const loading = writable(false)
  const error = writable("")

  async function get() {
    loading.set(true)
    error.set(false)
    
    new RailsFetch("/pages", {
      project_id: 1
    }).post()
    .then(data => pages.set(JSON.parse(data)))
    .catch(e => error.set(e))
    .finally(() => loading.set(false))
  }

  get()

  return [loading, error]
}

export {
  fetchPage,
  fetchPages,
  pages,
  page
}
