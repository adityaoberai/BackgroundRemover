<script>
// @ts-nocheck

    import { user } from "$lib/stores/user";
    import { onMount } from "svelte";
    import { storage } from "$lib/appwrite";
	import { ID } from "appwrite";

    onMount(() => {
        user.init();
    });

    async function getImage() {
        document.getElementById('imageOutput').src = null;
        var image = document.querySelector('#imageInput').files[0];
        
        var inputImage = await storage.createFile('input',
            ID.unique(),
            image
        );

        var inputImageUrl = storage.getFileView('input', inputImage.$id).href;

        console.log(inputImageUrl);

        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                imageUrl: inputImageUrl 
            })
        })
        .then(res => {
            console.log(res);
            return res.blob();
        })
        .then(blob => {
            console.log(blob.size);
            var url = URL.createObjectURL(blob);
            console.log(url);
            document.getElementById('imageOutput').src = url;
        });
        
    }
</script>

<h1>Remove Background</h1>

<form on:submit={() => getImage()}>
    <input type="file" id="imageInput">

    <button type="submit">Submit</button>
</form>


<br><br>

<img id="imageOutput" src="" width="600" alt="">

<footer>
    <button on:click={() => user.logout()}>Sign out</button>
</footer>