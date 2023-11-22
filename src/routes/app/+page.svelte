<script>
// @ts-nocheck

    import { user } from "$lib/user";
    import { imageDb } from "$lib/imagedb";
    import { storage } from "$lib/appwrite";
	import { ID, Permission, Role } from "appwrite";
	import NavBar from "../../components/NavBar.svelte";

    var outputImage = null;

    function onImageSelected() {
        document.querySelector('.inputImageContainer').style.visibility = "visible";
        document.querySelector('.outputImageContainer').style.visibility = "hidden";
        document.querySelector('.outputImageContainer').style.display = "none";
        var selectedFile = document.querySelector('#imageInputField').files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);
        fileReader.onload = () => document.querySelector("#inputImage").src = fileReader.result;
    }

    async function getImage() {
        document.querySelector('.inputImageContainer').style.display = "none";
        document.querySelector('.outputImageContainer').style.display = "flex";
        document.querySelector('.outputImageContainer').style.visibility = "visible";
        document.querySelector('.imageSubmitForm').style.display = "none";
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
            document.querySelector('#outputImage').src = storage.getFilePreview('output', outputImage.$id, 300);
            document.querySelector('.outputImageContainer').style.visibility = "visible";
            document.querySelector('.resetButton').style.display = "block";
            document.querySelector('.downloadButton').style.display = "block";  
            alert("Background removed!")
        });
    }

    async function downloadImage() {
        window.open(storage.getFileDownload('output', outputImage.$id));
    }    
</script>

<NavBar />

<section id="removeBackground">
    <h1>Remove Background</h1>

    <form class="imageSubmitForm" on:submit={getImage}>
        <input type="file" id="imageInputField" on:change={onImageSelected}>
        <button type="submit">Remove Background</button>
    </form>

    <br><br>

    <div class="imagesContainer">
        <div class="inputImageContainer">
            <div class="inputImageCard">
                <p>Inputted Image</p>
                <img id="inputImage" src="" alt="">
            </div>
        </div>
        <div class="outputImageContainer">
            <div class="outputImageCard">
                <button class="resetButton" on:click={() => { location.reload(); }}>Reset</button>
                <p>Outputted Image</p>
                <img id="outputImage" src="" alt="">
                <button class="downloadButton" on:click={downloadImage}>Download Image</button>
            </div>
            
        </div>
    </div>
</section>

<style>
    #removeBackground {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #removeBackground h1 {
        margin: 3rem auto;
    }

    #imageInputField {
        display: block;
        margin-bottom: 1rem;
    }

    .imagesContainer {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 5vh;
    }

    .inputImageContainer {
        visibility: hidden;
        margin: 0 1rem;
    }

    .inputImageCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #inputImage {
        display: block;
        max-height: 300px;
        max-width: 300px;
        height: auto;
    }

    .outputImageContainer {
        visibility: hidden;
        margin: 0 1rem;
        display: flex;
        flex-direction: row;
    }

    .outputImageCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .resetButton {
        margin: 1rem auto;
        display: none;
    }

    .downloadButton {
        margin: 1rem auto;
        display: none;
    }

    #outputImage  {
        display: block;
        max-height: 300px;
        max-width: 300px;
        height: auto;
        margin: 0 1rem;
    }
</style>