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
    <a href="http://github.com/adityaoberai/BackgroundRemover" target="_blank" rel="noopener noreferrer">Find Us On GitHub</a>
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

    #intro a {
        margin: 1rem;
        padding: 0.5rem;
        font-size: 1.25rem;
        border:  1px solid #333;
        border-radius: 5px;
        text-decoration: none;
        color: #333;
    }

    #intro a:hover {
        background-color: #555;
        color: #ccc;
    }

    @media screen and (max-width: 1200px) and (min-width: 601px) {
        #intro img {
            max-width: 20%;
            border-radius: 10%;
            margin: 2rem auto;
        }
    }

    @media screen and (max-width: 600px) {
        #intro img {
            max-width: 35%;
            border-radius: 10%;
            margin: 2rem auto;
        }

        #intro h1 {
            font-size: 3rem;
            margin: 2rem 2rem;
        }

        #intro h2 {
            font-size: 2rem;
            margin: 2rem 2rem;
        }
    }
</style>