<script>
// @ts-nocheck

    import { user } from "$lib/user";
  
    let email = "";

    async function createRecovery() {
        try {
            await user.createRecovery(email);
        } catch (error) {
            alert(error.message);
        }
    }
</script>

<section id="authFormContainer">
    <h1>Reset Password</h1>
    <form on:submit={createRecovery}>
        <input type="email" placeholder="Email" bind:value={email} />
        <button type="submit">Send Password Recovery Email</button>
    </form>
    <a href="/auth/login">Return to Login</a>
</section>