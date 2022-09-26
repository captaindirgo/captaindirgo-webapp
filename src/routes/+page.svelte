<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import { svg_element } from 'svelte/internal';
</script>

<svelte:head>
	<title>Overview</title>
	<meta name="description" content="Captain Dirgo" />
</svelte:head>


<section>
	<span class="welcome">
		<svg width="50%" viewBox="0 0 1707 1632" xmlns="http://www.w3.org/2000/svg">
			<image href="pirateship.svg"/>
		</svg>
		<img src="captaindirgo.svg" alt="Captain Dirgo" />
	</span>
</section>
<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		width: 100%;
		padding: 2em 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
