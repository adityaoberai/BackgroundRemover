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
        await imageDb.deleteImage(image.$id);
        await storage.deleteFile('output', image.imageId);
        invalidateAll();
    }
</script>

<div class="imageCard">
    <div class="image">
        <img src={imageSrc} alt="">
    </div> 
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
        border: 1px solid #333;
        border-radius: 5px;
        width: 25vw;
        height: 30vh;
    }

    .imageCard .image {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 70%;
        margin-bottom: 1rem;
    }

    .imageCard .image img {
        flex-direction: column;
        max-height: 70%;
        margin: 1rem auto;
    }

    .imageCardButtons {
        position: absolute;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        background-color: #333;
        width: 100%;
        height: 20%;
        bottom: 0;
    }

    .imageCardButtons button {
        margin: 0.5rem;
        background-color: #333;
        color: #ccc;
        text-decoration: none;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 2px;
    }

    .imageCardButtons button:hover {
        background-color: #ccc;
        color: #333;
    }

    @media screen and (max-width: 900px) {
        .imageCard {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 1rem;
            border: 1px solid #333;
            border-radius: 5px;
            width: 85vw;
            max-height: 70vh;
        }
    }
</style>