<script>
// @ts-nocheck

    import { user } from "$lib/user";

    let name = "";
    let email = "";
    let password = "";

    async function register() {
      try {
        await user.register(name, email, password);
      } catch (error) {
        alert(error.message);
      }
    };
  </script>
  
  <h1>Register</h1>
  <form>
    <input type="text" placeholder="Name" bind:value={name}>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" minlength="8" placeholder="Password" bind:value={password} />
    <button type="button" on:submit={register}>Register</button>
  </form>

  <a href="./login">Login instead?</a>
  
  <style>
    form {
      display: grid;
      gap: 0.25rem;
    }
  </style>
  