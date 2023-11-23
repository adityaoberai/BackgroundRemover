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

<section id="authFormContainer">
  <h1>Login</h1>
  <form on:submit={login}>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button type="submit">Login</button>
  </form>
  <a href="/auth/reset">Reset password?</a>
  <a href="/auth/register">Sign up instead?</a>
</section>