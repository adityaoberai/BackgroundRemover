<script>
	// @ts-nocheck

	import { user } from '$lib/user';
	import { goto } from '$app/navigation';
	import { createToast } from '$lib/toast';

	let email = '';

	async function createRecovery() {
		try {
			await user.createRecovery(email);
			createToast('Password reset email sent', 'Please check you email for reset link', 'green');
		} catch (error) {
			createToast('Error', error.message, 'red');
			goto('/');
		}
	}
</script>

<section id="authFormContainer">
	<h1>Reset Password</h1>
	<form on:submit={createRecovery}>
		<input type="email" placeholder="Email" bind:value={email} />
		<button type="submit">Send Password Recovery Email</button>
	</form>
	<a href="/auth/login">Return to Login</a>
</section>
