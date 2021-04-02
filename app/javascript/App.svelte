<script>	
	import { onMount } from "svelte"

	import Router from "svelte-spa-router"
	import routes from "./routes"

	import Header from "./components/Header.svelte"

	let loading = true

	onMount(() => {
		window.addEventListener("load", () => {
			loading = false
		})
	})
</script>

{ #if !loading }
	<div class="board">
		<Header />

		<Router { routes } />
	</div>
{ /if }

<style lang="scss">
	.board {
		padding: 4rem 1.5rem;
		margin: 0 auto;
	}
</style>
