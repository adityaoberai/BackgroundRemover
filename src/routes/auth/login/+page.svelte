<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { createToast } from '$lib/toast';
	import { user } from '$lib/user';
	import AlreadyLoggedIn from '../../../components/AlreadyLoggedIn.svelte';

	let email = '';
	let password = '';

	async function login() {
		try {
			await user.login(email, password);
			createToast('Login successful', 'User has signed in', 'green', 2000);
		} catch (error) {
			createToast('Error', error.message, 'red');
			goto('/');
		}
	}

	async function guestLogin() {
		try {
			await user.loginAnonymous();
			createToast('Guest login', 'Guest user has joined', 'green', 2000);
		} catch (error) {
			createToast('Error', error.message, 'red');
			goto('/');
		}
	}
</script>

{#if !$user}
	<section id="authFormContainer">
		<h1>Login</h1>
		<form on:submit={login}>
			<label for="email"> Email </label>
			<input id="email" type="email" placeholder="Email" bind:value={email} />
			<label for="password">
				Password <span>*</span>
			</label>
			<input id="password" type="password" placeholder="Password" bind:value={password} />
			<button type="submit">Login</button>
		</form>

		<p>OR</p>

		<button type="button" on:click={guestLogin}>Sign in as a Guest</button>

		<div class="authFormRedirects">
			<a href="/auth/reset">Reset password?</a>
			<a href="/auth/register">Sign up instead?</a>
		</div>
	</section>
{:else}
	<AlreadyLoggedIn />
{/if}

<style>
	span {
		color: red;
	}

	.authFormRedirects {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
