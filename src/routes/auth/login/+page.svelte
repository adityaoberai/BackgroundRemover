<script>
    import { user } from "$lib/stores/user";
  
    let email = "";
    let password = "";
  </script>
  
  <h1>Login</h1>
  <form>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button type="button" on:click={() => user.login(email, password)}
      >Login</button
    >
  </form>

  <a href="./register">Sign up instead?</a>
  
  <style>
    form {
      display: grid;
      gap: 0.25rem;
    }
  </style>
  