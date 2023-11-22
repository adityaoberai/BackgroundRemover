<script>
// @ts-nocheck

	import ImageCard from "../../components/ImageCard.svelte";
	import NavBar from "../../components/NavBar.svelte";

    export let data;
</script>

<NavBar />

<h1>Profile</h1>

<h2>Saved Images</h2>

<div class="savedImagesContainer">
    {#each data.images as image}
        <ImageCard image={image} />
    {/each}
</div>

<style>
    .savedImagesContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>