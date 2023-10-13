<script>
// @ts-nocheck

    import { user } from "$lib/stores/user";
    import { onMount } from "svelte";
    import { functions } from "$lib/appwrite";

    onMount(() => {
        user.init();
    });

    async function getImage() {
        var jwt = await user.createJWT();
        console.log(jwt);
        var functionUrl = "https://65296d5195d6ad4e14bb.appwrite.global/";

        var image = document.querySelector('#imageInput').files[0];

        var imageResponse = await fetch(functionUrl, {
            method: 'POST',
            body: image,
            headers: {
                'Content-Type': 'application/octet-stream',
                'X-Appwrite-JWT': jwt,
                'X-Appwrite-Project': 'bgremover',
                'X-Appwrite-Response-Format': '1.4.0',
                'Access-Control-Allow-Credentials': window.location.hostname
            }
        });
        console.log(await imageResponse.json());
    }
</script>

<h1>Remove Background</h1>

<input type="file" id="imageInput" on:change={() => getImage()}>

<footer>
    <button on:click={() => user.logout()}>Sign out</button>
</footer>