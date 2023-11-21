<script>
// @ts-nocheck

	import ImageCard from "../../components/ImageCard.svelte";
	import NavBar from "../../components/NavBar.svelte";

    export let data;
    
    console.log(data);
</script>

<NavBar />

<h1>Profile</h1>

<h2>Saved Images</h2>

{#each data.images as image}
    <ImageCard image={image} />
{/each}