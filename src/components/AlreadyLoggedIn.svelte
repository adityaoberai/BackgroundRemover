<script>
	import { goto } from "$app/navigation";

    async function goToApp() {
        goto('/app');
    }

    goToApp();
</script>

<section>
    <h1>You are logged in...</h1>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    h1 {
        font-size: 2rem;
        margin: 2rem 0;
    }
</style>