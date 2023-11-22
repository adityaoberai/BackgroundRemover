<script>
// @ts-nocheck

  import { user } from "$lib/user";

  let email = "";
  let password = "";

  async function login() {
    try {
      await user.login(email, password);
    } catch (error) {
      alert(error.message);
    }
  }
</script>

<h1>Login</h1>
<form>
  <input type="email" placeholder="Email" bind:value={email} />
  <input type="password" placeholder="Password" bind:value={password} />
  <button type="button" on:submit={login}>Login</button>
</form>

<a href="./reset">Reset password?</a>

<a href="./register">Sign up instead?</a>

<style>
form {
  display: grid;
  gap: 0.25rem;
}
</style>
  