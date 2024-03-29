<script>
	// @ts-nocheck

	import { user } from '$lib/user';
	import { db } from '$lib/db';
	import { images } from '$lib/storage';
	import { createToast, deleteAllToasts } from '$lib/toast';
	import NavBar from '../../components/NavBar.svelte';
	import VerifyLogin from '../../components/VerifyLogin.svelte';
	import {
		PUBLIC_APPWRITE_OUTPUT_IMAGES_BUCKET_ID,
		PUBLIC_APPWRITE_INPUT_IMAGES_BUCKET_ID
	} from '$env/static/public';

	const inputBucketId = PUBLIC_APPWRITE_INPUT_IMAGES_BUCKET_ID;
	const outputBucketId = PUBLIC_APPWRITE_OUTPUT_IMAGES_BUCKET_ID;

	var outputImage = null;

	function onImageSelected() {
		var selectedFile = document.querySelector('#imageInputField').files[0];

		if (selectedFile.size > 20971520) {
			createToast('Error', 'Image size must be less than 20MB', 'red');
			return;
		} else {
			document.querySelector('.inputImageContainer').style.visibility = 'visible';
			document.querySelector('.outputImageContainer').style.visibility = 'hidden';
			document.querySelector('.outputImageContainer').style.display = 'none';
			document.querySelector('#imageInputButton').style.display = 'block';
			var fileReader = new FileReader();
			fileReader.readAsDataURL(selectedFile);
			fileReader.onload = () => (document.querySelector('#inputImage').src = fileReader.result);
		}
	}

	async function uploadInputImage() {
		var image = document.querySelector('#imageInputField').files[0];
		createToast('Uploading input', 'Uploading image to remove background from', 'blue', 0);
		var inputImage = await images.uploadInputImage(inputBucketId, image);
		var url = images.viewImage(inputBucketId, inputImage.$id);

		return {
			id: inputImage.$id,
			url: url
		};
	}

	async function getImage() {
		document.querySelector('.inputImageContainer').style.display = 'none';
		document.querySelector('.outputImageContainer').style.display = 'flex';
		document.querySelector('.outputImageContainer').style.visibility = 'visible';
		document.querySelector('.resetButton').style.display = 'block';
		document.querySelector('.imageSubmitForm').style.display = 'none';

		var inputImage = await uploadInputImage();

		createToast('Processing image', 'Removing background from the image', 'blue', 0);
		fetch('/app/remove', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				imageUrl: inputImage.url
			})
		})
			.then((res) => res.blob())
			.then((blob) => {
				createToast('Uploading output', 'Saving processed image', 'blue', 0);
				return images.uploadOutputImage(outputBucketId, blob, $user.$id);
			})
			.then((createdImage) => {
				outputImage = createdImage;
				db.addImage($user.$id, outputImage.$id);
				document.querySelector('#outputImage').src = images.previewImage(
					outputBucketId,
					outputImage.$id,
					600
				);
				document.querySelector('.outputImageCard').style.visibility = 'visible';
				document.querySelector('.downloadButton').style.display = 'block';
				createToast('Background removed', 'Image processed and ready to view', 'green', 0);
				setTimeout(() => {
					deleteAllToasts();
				}, 2000);
				images.deleteImage(inputBucketId, inputImage.id);
			})
			.catch((error) => {
				console.error(error.message);
				createToast('Error', error.message, 'red');
			});
	}

	async function downloadImage() {
		window.open(images.downloadImage(outputBucketId, outputImage.$id));
	}
</script>

<NavBar />

{#if $user}
	<section id="removeBackground">
		<h1>Remove Background</h1>

		<form class="imageSubmitForm">
			<label for="imageInputField">
				<strong>Upload Image Here</strong><span>(Size Limit: 20MB)</span>
				<input type="file" accept="image/*" id="imageInputField" on:change={onImageSelected} />
			</label>
		</form>

		<br /><br />

		<div class="imagesContainer">
			<div class="inputImageContainer">
				<div class="inputImageCard">
					<h2>Inputted Image</h2>
					<img id="inputImage" src="" alt="" />
					<button type="button" id="imageInputButton" on:click={getImage}>Remove Background</button>
				</div>
			</div>
			<div class="outputImageContainer">
				<button
					class="resetButton"
					on:click={() => {
						location.reload();
					}}>Reset Image</button
				>
				<div class="outputImageCard">
					<h2>Outputted Image</h2>
					<img id="outputImage" src="" alt="" />
					<button class="downloadButton" on:click={downloadImage}>Download Image</button>
				</div>
			</div>
		</div>
	</section>
{:else}
	<VerifyLogin />
{/if}

<style>
	#removeBackground {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		margin: 0 auto;
	}

	#removeBackground h1 {
		font-size: 3rem;
		margin: 3rem 0;
	}

	#removeBackground h2 {
		font-size: 2rem;
		margin: 1rem 0;
	}

	#imageInputField {
		display: block;
		margin: 1rem 0;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 1rem;
	}

	strong {
		font-size: 1.25rem;
	}

	span {
		color: red;
		font-size: 1rem;
	}

	button {
		display: none;
		background-color: #333;
		color: #ccc;
		font-size: 1rem;
		border-radius: 5px;
		padding: 1rem;
		margin: 1rem 0;
	}

	button:hover {
		background-color: #555;
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
		max-height: 50%;
		max-width: 30%;
		height: auto;
		margin: 1rem 0;
	}

	.outputImageContainer {
		visibility: hidden;
		margin: 0 1rem;
		display: flex;
		flex-direction: column;
	}

	.outputImageCard {
		display: flex;
		visibility: hidden;
		flex-direction: column;
		align-items: center;
	}

	.resetButton {
		margin: 1rem auto;
		display: none;
	}

	.downloadButton {
		margin: 1rem auto;
		display: none;
	}

	#outputImage {
		display: block;
		max-height: 35%;
		max-width: 60%;
		height: auto;
		margin: 1rem 0;
	}

	@media screen and (max-width: 600px) {
		#inputImage {
			display: block;
			max-height: 50%;
			max-width: 75%;
			height: auto;
			margin: 1rem 0;
		}
	}

	@media screen and (min-width: 601px) and (max-width: 1200px) {
		#inputImage {
			display: block;
			max-height: 50%;
			max-width: 50%;
			height: auto;
			margin: 1rem 0;
		}
	}
</style>
