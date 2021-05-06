<script>	
	import { onMount } from "svelte"

	import Router from "svelte-spa-router"
	import routes from "./routes"

	import RailsFetch from "./shared/railsFetch.js"
	import { theme } from "./stores/theme.js"
	import { projects, project } from "./stores/project.js"
	import { currentUser } from "./stores/user.js"
	import { pages } from "./stores/data.js"

	import Header from "./components/Header.svelte"
	import GlobalError from "./components/GlobalError.svelte"

	export let _user
	export let _project
	export let _projects

	let loading = true

	onMount(() => {
		$currentUser = _user
		$project = _project
		$projects = _projects
		$theme = JSON.parse($project.properties)

		getPages()

		window.addEventListener("load", () => {
			loading = false
		})
	})

	function getPages() {
    new RailsFetch("/pages", {
      project_id: 1
    }).post()
    .then(data => $pages = JSON.parse(data))
  }
</script>



{ #if $currentUser }
	{ #if !loading }
		<div class="container">
			<Header />

			<Router { routes } />
		</div>
	{ /if }
{ :else }
	Please log in
{ /if }

<GlobalError />



<style lang="scss">
	.container {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}
</style>
