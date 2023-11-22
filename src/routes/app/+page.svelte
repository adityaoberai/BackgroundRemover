<script>
// @ts-nocheck

    import { user } from "$lib/user";
    import { imageDb } from "$lib/imagedb";
    import { storage } from "$lib/appwrite";
	import { ID, Permission, Role } from "appwrite";
    import NavBar from "../../components/NavBar.svelte";

    var outputImage = null;

    function onImageSelected() {
        document.querySelector('.inputtedImageContainer').style.visibility = "visible";
        document.querySelector('.outputtedImageContainer').style.visibility = "hidden";
        var selectedFile = document.querySelector('#imageInputField').files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);
        fileReader.onload = () => document.querySelector("#inputtedImage").src = fileReader.result;
    }

    async function getImage() {
        var image = document.querySelector('#imageInputField').files[0];

        alert("Uploading image...")
        var inputImage = await storage.createFile('input',
            ID.unique(),
            image
        );

        var inputImageUrl = storage.getFileView('input', inputImage.$id).href;

        alert("Removing background...");
        fetch('/app/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                imageUrl: inputImageUrl 
            })
        })
        .then(res => res.blob())
        .then(blob => {
            alert("Saving output to profile...");
            return storage.createFile('output', 
                ID.unique(), 
                new File([blob], 'output.png'),
                [Permission.write(Role.user($user.$id)), Permission.read(Role.user($user.$id))]
            );
        })
        .then(createdImage => {
            outputImage = createdImage;
            imageDb.addImage($user.$id, outputImage.$id);
            document.querySelector('.outputtedImageContainer').style.visibility = "visible";
            document.querySelector('#outputtedImage').src = storage.getFileView('output', outputImage.$id);
            alert("Background removed!")
        });
    }

    async function downloadImage() {
        window.open(storage.getFileDownload('output', outputImage.$id));
    }    
</script>

<NavBar />

<h1>Remove Background</h1>

<form on:submit={getImage}>
    <input type="file" id="imageInputField" on:change={onImageSelected}>

    <button type="submit">Submit</button>
</form>

<br><br>

<div class="imagesContainer">
    <div class="inputtedImageContainer">
        <p>Inputted Image</p>
        <img id="inputtedImage" src="" alt="">
    </div>
    <div class="outputtedImageContainer">
        <p>Outputted Image</p>
        <img id="outputtedImage" src="" alt="">
        <br>
        <form on:submit={downloadImage}>
            <button type="submit">Download Image</button>
        </form>
    </div>
</div>

<br><br>

<style>
    #imageInputField {
        display: block;
        margin-bottom: 1rem;
    }

    .imagesContainer {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 5vh;
    }

    .inputtedImageContainer {
        visibility: hidden;
        margin: 0 1rem;
    }

    .outputtedImageContainer {
        visibility: hidden;
        margin: 0 1rem;
    }

    #inputtedImage {
        display: block;
        max-height: 400px;
    }

    #outputtedImage  {
        display: block;
        max-height: 400px;
        margin: 0 1rem;
    }
</style>