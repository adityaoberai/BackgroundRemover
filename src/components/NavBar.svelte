<script>
    import { user } from "$lib/user";
</script>

<nav>
    <div class="dropdown">
        <button class="dropbtn">Menu</button>
        <div class="dropdown-content">
            <a href="/">Home</a>
            {#if $user}
            <a href="/app">Remove Background</a>
            <a href="/profile">Profile</a>
            <a href="/profile/settings">Settings</a>
            <a href="https://github.com/adityaoberai/BackgroundRemover" target="_blank">Star on GitHub</a>
            <a href="/auth/logout">Sign Out</a>
            {:else}
            <a href="/auth/login">Login</a>
            <a href="/auth/register">Register</a>
            {/if}
        </div>
    </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: flex-start;
        padding: 1rem;
        width: 100%;
        background-color: #333;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #333;
        z-index: 1;
    }

    .dropdown-content a {
        font-size: 1rem;
        color: #ccc;
        padding: 1rem 2rem;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: #ccc;
        color: #333;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown:hover .dropbtn {
        background-color: #ccc;
        color: #333;
    }

    .dropbtn {
        background-color: #333;
        color: white;
        padding: 1rem;
        font-size: 1rem;
        border: none;
        cursor: pointer;
    }

    .dropbtn:hover {
        background-color: #333;
        color: #ccc;
    }
</style>
