<script>
	// @ts-nocheck

	import { user } from '$lib/user';
	import { goto } from '$app/navigation';
	import { createToast } from '$lib/toast';
	import NavBar from '../../../components/NavBar.svelte';
	import VerifyLogin from '../../../components/VerifyLogin.svelte';
	import IsAnonymous from '../../../components/IsAnonymous.svelte';

	let oldPassword = '';
	let newPassword = '';

	async function changePassword() {
		try {
			await user.updatePassword(oldPassword, newPassword);
			createToast('Password Updated', 'User password has been updated', 'green');
			goto('/profile');
		} catch (error) {
			createToast('Error', error.message, 'red');
		}
	}

	async function deleteAccount() {
		if (!document.getElementById('deleteCheck').checked) {
			createToast('Error', 'You must confirm that you want to delete your account', 'red');
			return;
		}
		createToast('Deleting Account', 'Starting account deletion process', 'blue');
		try {
			var deleteRequest = await user.deleteAccount($user.$id);
			var deleteRequestBody = JSON.parse(deleteRequest.responseBody);
			if (deleteRequestBody.status === 'success') {
				createToast('Account Deleted', 'User account has been deleted', 'green');
			} else {
				createToast('Error occurred', deleteRequestBody.message, 'red');
			}
		} catch (error) {
			createToast('Error', error.message, 'red', 2000);
		}
		goto('/');
	}
</script>

<NavBar />

{#if $user && $user.email}
	<section id="authFormContainer">
		<h1>Settings</h1>

		<h2>Change Password</h2>

		<form on:submit={changePassword}>
			<input type="password" minlength="8" placeholder="Old Password" bind:value={oldPassword} />
			<input type="password" minlength="8" placeholder="New Password" bind:value={newPassword} />
			<button type="submit">Update Password</button>
		</form>

		<h2>Delete Account</h2>
		<button class="deleteButton" type="button" on:click={deleteAccount}>Delete</button>
		<div class="deleteCheckbox">
			<label for="deleteCheck">
				<input type="checkbox" name="deleteCheck" id="deleteCheck" />
				I confirm that I want to delete my account. I acknowledge that this action cannot be undone and
				will delete all my saved pictures.
			</label>
		</div>
	</section>
{:else if $user && !$user.email}
	<IsAnonymous />
{:else}
	<VerifyLogin />
{/if}

<style>
	#authFormContainer .deleteButton {
		font-size: 1rem;
		margin: 1rem;
		padding: 1rem 2rem;
		border-radius: 5px;
		background-color: red;
		color: #fff;
		border: none;
		cursor: pointer;
		margin: 1rem 0;
	}

	#authFormContainer .deleteButton:hover {
		background-color: crimson;
	}

	.deleteCheckbox {
		display: inline;
		max-width: 67%;
		text-align: center;
	}

	.deleteCheckbox label {
		font-size: 1rem;
		word-wrap: break-word;
	}
</style>
