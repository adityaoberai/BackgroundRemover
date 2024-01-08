<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import { user } from '$lib/user';
	import { goto } from '$app/navigation';
	import { createToast } from '$lib/toast';

	let userId = $page.url.searchParams.get('userId');
	let secret = $page.url.searchParams.get('secret');
	let password = '';
	let confirmPassword = '';

	async function updateRecovery() {
		try {
			await user.updateRecovery(userId, secret, password, confirmPassword);
			createToast('Password Reset', 'User password has been reset', 'green');
		} catch (error) {
			createToast('Error', error.message, 'red');
			goto('/');
		}
	}
</script>

<section id="authFormContainer">
	<h1>Set New Password</h1>
	<form on:submit={updateRecovery}>
		<input type="password" placeholder="New Password" bind:value={password} />
		<input type="password" placeholder="Confirm Password" bind:value={confirmPassword} />
		<button type="submit">Set New Password</button>
	</form>
</section>
