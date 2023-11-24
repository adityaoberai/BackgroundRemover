<script>
// @ts-nocheck

	import ImageCard from "../../components/ImageCard.svelte";
	import NavBar from "../../components/NavBar.svelte";
    import VerifyLogin from "../../components/VerifyLogin.svelte";
    import { user } from "$lib/user";

    export let data;
</script>

<NavBar />

{#if $user}
    <section id="profile">
        <h1>Profile</h1>

        <h2>Saved Images</h2>

        <div class="savedImagesContainer">
            {#each data.images as image}
                <ImageCard image={image} />
            {/each}
        </div>
    </section>
{:else}
    <VerifyLogin />
{/if}

<style>
    #profile {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #profile h1 {
    font-size: 3rem;
    margin: 1rem 0;
    }

    #profile h2 {
        font-size: 2rem;
        margin: 1rem 0;
    }

    #profile .savedImagesContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>