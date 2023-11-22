<script>
// @ts-nocheck

    import NavBar from "../../../components/NavBar.svelte";
    import { user } from "$lib/user";
	import { goto } from "$app/navigation";

    let oldPassword = "";
    let newPassword = "";

    async function changePassword() {
        try {
            await user.updatePassword(oldPassword, newPassword);
            alert("Password updated!");
            goto("/profile");
        } catch (error) {
            alert(error.message);
        }
    }
    
</script>

<NavBar />

<h1>Settings</h1>

<h2>Change Password</h2>

<form on:submit={changePassword}>
    <input type="password" minlength="8" placeholder="Old Password" bind:value={oldPassword} />
    <input type="password" minlength="8" placeholder="New Password" bind:value={newPassword} />
    <button type="submit">Update Password</button>
</form>