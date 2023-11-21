<script>
// @ts-nocheck

    import { user } from "$lib/user";
    import { imageDb } from "$lib/imagedb";
    import { storage } from "$lib/appwrite";
	import { ID, Permission, Role } from "appwrite";
    import NavBar from "../../components/NavBar.svelte";

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
            var url = URL.createObjectURL(blob);
            document.querySelector('.outputtedImageContainer').style.visibility = "visible";
            document.querySelector('#outputtedImage').src = url;
        })
        .then(() => alert("Background removed!"));
    }

    async function uploadOutput() {
        var outputImageSource = await fetch(document.querySelector('#outputtedImage').src);
        var outputImageBlob = await outputImageSource.blob();
        var outputImageFile = new File([outputImageBlob], 'output.png');
        
        var outputImage = await storage.createFile('output', 
            ID.unique(), 
            outputImageFile,
            [Permission.write(Role.user($user.$id)), Permission.read(Role.user($user.$id))]
        );

        var imageDocument = await imageDb.addImage($user.$id, outputImage.$id);
        console.log(imageDocument);

        var outputImageUrl = storage.getFileView('output', outputImage.$id).href;

        alert(outputImageUrl);
        
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
        <form on:submit={uploadOutput}>
            <button type="submit">Save To Profile</button>
        </form>
    </div>
    
</div>

<br><br>

<footer>
    <button on:click={() => user.logout()}>Sign out</button>
</footer>

<style>
    #imageInputField {
        display: block;
        margin-bottom: 1rem;
    }

    .imagesContainer {
        display: flex;
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

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background: #eee;
        text-align: center;
    }
</style>