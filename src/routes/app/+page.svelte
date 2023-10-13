<script>
    import { user } from "$lib/stores/user";
    import { onMount } from "svelte";

    onMount(() => {
        user.init();
    });
</script>

<h1>Remove Background</h1>

<input type="file" id="imageInput">

<footer>
    <button on:click={() => user.logout()}>Sign out</button>
</footer>