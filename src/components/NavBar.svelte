<script>
// @ts-nocheck

    import { user } from "$lib/user";

    async function signOut() {
        try {
            await user.signOut();
        } catch (error) {
            alert(error.message);
        }
    }
</script>

<nav>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/app">Remove Background</a>
        </li>
        <li>
            <a href="/profile">Profile</a>
        </li>
        <li>
            <a href="/profile/settings">Settings</a>
        </li>
        <li>
            <button on:click={signOut}>Sign Out</button>
        </li>
    </ul>
</nav>

<style>
    nav {
        height: 3rem;
        background-color: #333;
        
    }

    nav ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        list-style-type: none;
        width: 100%;
    }

    nav ul li {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style-type: none;
    }

    nav a {
        border: 1px solid white;
        padding: 1rem;
        color: white;
        text-decoration: none;
    }

    nav a:hover {
        background-color: white;
        color: #333;
    }
</style>
