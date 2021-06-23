import Home from "./components/routes/Home.svelte"
import PageNew from "./components/routes/pages/New.svelte"
import PageEdit from "./components/routes/pages/Edit.svelte"
import PageIndex from "./components/routes/pages/Index.svelte"
import Notifications from "./components/routes/Notifications.svelte"
import NotFound from "./components/routes/NotFound.svelte"

export default {
  "/": Home,
  "/pages/:uuid": PageIndex,
  "/edit/page/:uuid": PageEdit,
  "/new/page": PageNew,
  "/notifications": Notifications,
  "*": NotFound
}
