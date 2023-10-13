<script>
    import { user } from "$lib/stores/user";

    let name = "";
    let email = "";
    let password = "";
  </script>
  
  <h1>Register</h1>
  <form>
    <input type="text" placeholder="Name" bind:value={name}>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button type="button" on:click={() => user.register(name, email, password)}
      >Register</button
    >
  </form>

  <a href="./login">Login instead?</a>
  
  <style>
    form {
      display: grid;
      gap: 0.25rem;
    }
  </style>
  