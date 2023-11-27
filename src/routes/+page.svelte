<script>
    import { goto } from "$app/navigation";
    import { user } from "$lib/user";
</script>

<section id="intro">
    <img src="logo.png" alt="Background Remover">
    <h1>Background Remover</h1>
    <h2>Remove the background from your headshot!</h2>

    {#if $user}
        <button on:click={() => goto("/app")}>Get Started</button>
    {:else}
        <button on:click={() => goto("/auth/login")}>Login</button>
    {/if}
</section>

<style>
    #intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;    
    }

    #intro img {
        max-width: 15%;
        border-radius: 10%;
        margin: 2rem auto;
    }

    #intro h1 {
        font-size: 3rem;
        margin: 1rem auto;
    }

    #intro h2 {
        font-size: 2rem;
        margin: 1rem 0;
    }

    #intro button {
        font-size: 1.5rem;
        padding: 1rem 2rem;
        border-radius: 5px;
        background-color: #333;
        color: white;
        border: none;
        cursor: pointer;
        margin: 1rem 0;
    }

    #intro button:hover {
        background-color: #555;
    }
</style>