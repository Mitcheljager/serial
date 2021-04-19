<script>	
	import { onMount } from "svelte"

	import Router from "svelte-spa-router"
	import routes from "./routes"

	import { theme } from "./stores/theme.js"
	import { projects, project } from "./stores/project.js"
	import { currentUser } from "./stores/user.js"

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

		window.addEventListener("load", () => {
			loading = false
		})
	})
</script>



{ #if $currentUser }
	{ #if !loading }
		<div class="board">
			<Header />

			<Router { routes } />
		</div>
	{ /if }
{ :else }
	Please log in
{ /if }

<GlobalError />



<style lang="scss">
	.board {
		padding: 4rem 1.5rem;
		margin: 0 auto;
	}
</style>
