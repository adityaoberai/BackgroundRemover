<script>
// @ts-nocheck

	import { storage } from "$lib/appwrite";
	import { imageDb } from "$lib/imagedb";
	import { invalidateAll } from "$app/navigation";
    
    export let image;

    let imageSrc = storage.getFileView('output', image.imageId);

    async function deleteImage() {
        await storage.deleteFile('output', image.imageId);
        await imageDb.deleteImage(image.$id);
        invalidateAll();
    }
</script>

<div class="imageCard">
    <img src={imageSrc} alt="">
    <button on:click={deleteImage}>Delete</button>
</div>

<style>
    .imageCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1rem;
        max-width: 300px;
    }

    .imageCard img {
        width: 80%;
        height: auto;
    }
</style>