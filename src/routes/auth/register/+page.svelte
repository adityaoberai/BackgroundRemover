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
    <label for="name">
      Full Name <span>*</span>
    </label>
    <input id="name" type="text" placeholder="Name" bind:value={name} required/>
    <label for="email">
      Email <span>*</span>
    </label>
    <input id="email" type="email" placeholder="Email" bind:value={email} required/>
    <label for="password">
      Password <span>*</span>
    </label>
    <input id="password" type="password" minlength="8" placeholder="Password" bind:value={password} required/>
    <button type="submit">Register</button>
  </form>

  <a href="/auth/login">Login instead?</a>

  <div class="footer">
    <div class="authFormTerms">
      <p>By registering on the website, you allow your images uploaded to be processed by Azure AI Vision and for your registration details and outputted images to be stored in Appwrite Cloud.</p>
    </div>
  </div>
</section>

<style>
  span {
    color: red;
  }

  .footer {
    position: absolute;
    bottom: 0;
    margin: 5% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .authFormTerms {
    width: 50%;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #ccc;
  }

  .authFormTerms p {
    text-align: center;
    padding: 1rem;
  }
</style>