<script>
	// @ts-nocheck

	import ImageCard from '../../components/ImageCard.svelte';
	import NavBar from '../../components/NavBar.svelte';
	import VerifyLogin from '../../components/VerifyLogin.svelte';
	import IsAnonymous from '../../components/IsAnonymous.svelte';
	import { user } from '$lib/user';

	export let data;
</script>

<NavBar />

{#if $user && $user.email}
	<section id="profile">
		<h1>{$user.name}</h1>

		<h2>Saved Images <span>(latest 25 images)</span></h2>

		<div class="savedImagesContainer">
			{#each data.images as image}
				<ImageCard {image} />
			{/each}
		</div>
	</section>
{:else if $user && !$user.email}
	<IsAnonymous />
{:else}
	<VerifyLogin />
{/if}

<style>
	#profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#profile h1 {
		font-size: 3rem;
		margin: 1rem 0;
	}

	#profile h2 {
		font-size: 2rem;
		margin: 1rem 0;
	}

	span {
		font-size: 1rem;
		color: red;
	}

	#profile .savedImagesContainer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
