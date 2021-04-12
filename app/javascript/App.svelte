<script>	
	import { onMount } from "svelte"

	import Router from "svelte-spa-router"
	import routes from "./routes"

	import { currentUser } from "./stores/user.js"

	import Header from "./components/Header.svelte"

	export let user

	let loading = true

	onMount(() => {
		$currentUser = user

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

<style lang="scss">
	.board {
		padding: 4rem 1.5rem;
		margin: 0 auto;
	}
</style>
