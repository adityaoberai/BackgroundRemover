<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { createToast } from '$lib/toast';
	import { user } from '$lib/user';

	async function signOut() {
		try {
			await user.logout();
			createToast('Logout successful', 'User has signed out', 'green');
		} catch (error) {
			createToast('Error', error.message, 'red');
			goto('/');
		}
	}

	signOut();
</script>

<section id="authFormContainer">
	<h1>Logging out...</h1>
</section>
