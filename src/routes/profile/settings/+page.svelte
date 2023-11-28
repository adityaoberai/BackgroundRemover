<script>
// @ts-nocheck

    import { user } from "$lib/user";
	import { goto } from "$app/navigation";
    import { createToast } from "$lib/toast";
    import NavBar from "../../../components/NavBar.svelte";
	import VerifyLogin from "../../../components/VerifyLogin.svelte";
	import IsAnonymous from "../../../components/IsAnonymous.svelte";

    let oldPassword = "";
    let newPassword = "";

    async function changePassword() {
        try {
            await user.updatePassword(oldPassword, newPassword);
            createToast("Password Updated", "User password has been updated", "green");
            goto('/profile');
        } catch (error) {
            createToast("Error", error.message, "red");
        }
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

    <h2>Delete Account - Coming Soon</h2>
</section>
{:else if $user && !$user.email}
<IsAnonymous />
{:else}
<VerifyLogin />
{/if}