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

<h1>Reset Password</h1>
<form on:submit={createRecovery}>
    <input type="email" placeholder="Email" bind:value={email} />
    <button type="submit">Send Password Recovery Email</button>
</form>

<style>
form {
    display: grid;
    gap: 0.25rem;
}
</style>
