<script>
    import { user } from "$lib/user";
  
    let email = "";
</script>

<h1>Reset Password</h1>
<form>
    <input type="email" placeholder="Email" bind:value={email} />
    <button type="button" on:click={() => user.createRecovery(email)}
        >Set Password Recovery Email</button
    >
</form>

<style>
form {
    display: grid;
    gap: 0.25rem;
}
</style>
