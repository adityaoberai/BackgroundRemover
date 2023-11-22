<script>
// @ts-nocheck

	import { storage } from "$lib/appwrite";
	import { imageDb } from "$lib/imagedb";
	import { invalidateAll } from "$app/navigation";
    
    export let image;

    var imageSrc = storage.getFilePreview('output', image.imageId, 250);

    async function viewImage() {
        window.open(storage.getFileView('output', image.imageId), '_blank')
    }

    async function downloadImage() {
        window.open(storage.getFileDownload('output', image.imageId));
    }

    async function deleteImage() {
        await storage.deleteFile('output', image.imageId);
        await imageDb.deleteImage(image.$id);
        invalidateAll();
    }
</script>

<div class="imageCard">
    <img src={imageSrc} alt="">
    <div class="imageCardButtons">
        <button on:click={viewImage}>View</button>
        <button on:click={downloadImage}>Download</button>
        <button on:click={deleteImage}>Delete</button>
    </div>
</div>

<style>
    .imageCard {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1rem;
        width: 300px;
        border: 1px solid black;
    }

    .imageCard img {
        max-height: 70%;
        margin: 1rem auto;
    }

    .imageCard .imageCardButtons {
        position: absolute;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        bottom: 0;
    }

    .imageCard .imageCardButtons button {
        margin: 0.5rem;
    }
</style>