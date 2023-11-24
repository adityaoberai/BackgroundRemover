<script>
// @ts-nocheck

    import { user } from "$lib/user";
    import { goto } from "$app/navigation";
    import { createToast } from "$lib/toast";

    let name = "";
    let email = "";
    let password = "";

    async function register() {
      try {
        await user.register(name, email, password);
        createToast('Registration successful', 'User has signed up', 'green');
      } catch (error) {
        createToast('Error', error.message, 'red');
        goto('/')
      }
    };
</script>

<section id="authFormContainer">
  <h1>Register</h1>
  <form on:submit={register}>
    <input type="text" placeholder="Name" bind:value={name}>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" minlength="8" placeholder="Password" bind:value={password} />
    <button type="submit">Register</button>
  </form>

  <a href="/auth/login">Login instead?</a>
</section>