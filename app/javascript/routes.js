import Home from "./components/routes/Home.svelte"
import PageNew from "./components/routes/pages/New.svelte"
import PageShow from "./components/routes/pages/Show.svelte"
import PageIndex from "./components/routes/pages/Index.svelte"
import Notifications from "./components/routes/Notifications.svelte"
import NotFound from "./components/routes/NotFound.svelte"

export default {
  "/": Home,
  "/pages/:id?": PageIndex,
  "/pages/new": PageNew,
  "/notifications": Notifications,
  "*": NotFound
}
