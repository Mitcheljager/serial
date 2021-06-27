<script>	
	import { onMount } from "svelte"

	import Router from "svelte-spa-router"
	import routes from "./routes"

	import { theme } from "./stores/theme"
	import { projects, project } from "./stores/project"
	import { currentUser, editMode } from "./stores/user"
	import { directUploadUrl } from "./stores/data"
	import { fetchPages } from "./stores/pages"
	import { globalError } from "./stores/error"

	import Header from "./components/Header.svelte"
	import GlobalError from "./components/GlobalError.svelte"

	const [loading, error] = fetchPages()
	$: if ($error) $globalError = "Something went wrong when fetching your pages"

	export let _user
	export let _project
	export let _projects
	export let _directUploadUrl

	onMount(() => {
		$editMode = true
		$currentUser = _user
		$project = _project
		$projects = _projects
		$theme = JSON.parse($project.properties)
		$directUploadUrl = _directUploadUrl
	})
</script>



{ #if $currentUser }
	{ #if $loading }
		Loading...
	{ :else }
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
