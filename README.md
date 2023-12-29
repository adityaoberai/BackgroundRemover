<a href="https://bgremover.in" target="_blank">
    <img src="https://github.com/adityaoberai/BackgroundRemover/assets/31401437/d54502e9-0fe4-441e-99d0-9e117ab0e464" alt="Background Remover" width="1000">
</a>

# Background Remover

## Description

Background Remover is a SvelteKit app that uses Appwrite Cloud and Azure AI to remove the background from your headshots (and other images).

### Features

- Removes background from your picture
- Register via email or login as guest
- Saves images to your profile _(for logged in users)_
- Allows viewing (and sharing) of picture links _(for logged in users)_

## Setup

There are some necessary steps to get the project up and running.

### Azure AI

- Create an [Azure account](https://azure.com)
- Create a [Computer Vision resource](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft.cognitiveservicescomputervision?tab=overview) from the Azure Marketplace.

> Keep the endpoint and API key stored with you for later.

### Appwrite Cloud 

#### Project

- Create an account on [Appwrite Cloud](https://cloud.appwrite.io/register) (or sign in if you have one)
- Create a project and add your web app (URL)
    - Adding the exact URL is necessary for the reset password link functionality
- Create an API key with `user.read`, `user.write`, `documents.read`, `documents.write`, `files.read`, and `files.write` scopes

> Keep the project ID and API key stored with you for later.

#### Storage

- Create two buckets, one for input images and one for output images

| | Input Images Bucket | Output Images Bucket |
| - | - | - |
| Purpose | Contains images to be processed, have their backgrounds removed, and get deleted after | Contains images that have had their backgrounds removed |
| Id | input | output |
| Permissions | ![image](https://github.com/adityaoberai/BackgroundRemover/assets/31401437/c74a7f7a-df1b-4b5a-8419-22c171460fda) | ![image](https://github.com/adityaoberai/BackgroundRemover/assets/31401437/677d0df5-628c-4a27-b8b3-8c456ac6a73e) |

> Keep both your bucket Ids stored with you for later.

#### Database

- Create a database with one collection, containing the following attributes

| Key | Type | Size | Required |
| - | - | - | - |
| userId | string | 255 | Yes |
| fileId | string | 255 | Yes |

- Set the permissions as visible in the image
![image](https://github.com/adityaoberai/BackgroundRemover/assets/31401437/c48e9994-9add-4cb8-952c-bb2cc626dac0)


> Keep the database Id and collection Id stored with you for later.

#### Function

- Change the branch (Git) to [`appwrite-functions`](https://github.com/adityaoberai/BackgroundRemover/tree/appwrite-functions) to find the Appwrite function that helps in deleting accounts
- Update the project name and project id in the `appwrite.json` file, if you kept them different
- [Deploy the function](https://appwrite.io/docs/products/functions/deployment) from the `functions/Delete Account` directory, following the configuration details in the [function's Readme](https://github.com/adityaoberai/BackgroundRemover/tree/appwrite-functions?tab=readme-ov-file#delete-account)
- Setup the function's environment variables as mentioned in the function's Readme

> Keep the function Id stored with you for later.

### Environment variables

Rename the `.env.example` file to `.env` and add all the necessary environment variables.

- `VITE_APP_URL`: URL of the app with protocol _(e.g.: https://bgremover.in)_
- `PUBLIC_APPWRITE_COLLECTION_ID`: Collection Id from Appwrite
- `PUBLIC_APPWRITE_DATABASE_ID`: Database Id from Appwrite
- `PUBLIC_APPWRITE_PROJECT_ID`: Project Id from Appwrite
- `PUBLIC_APPWRITE_OUTPUT_IMAGES_BUCKET_ID`: Output images bucket Id from Appwrite
- `PUBLIC_APPWRITE_INPUT_IMAGES_BUCKET_ID`: Input images bucket Id from Appwrite
- `PUBLIC_APPWRITE_DELETE_ACCOUNT_FUNCTION_ID`: Delete account function Id from Appwrite
- `SECRET_VISION_ENDPOINT`: Azure AI Vision endpoint
- `SECRET_VISION_KEY`: Azure AI Vision API Key

## Deployment

### Vercel

The `svelte.config.js` file is currently configured for Vercel since that is where the application is deployed and a custom timeout is configured for server actions.

### Other PaaS platforms (Cloudflare, Azure, etc.)

- Install `@sveltejs/adapter-auto` using npm/pnpm/yarn
- Replace all the code in the `svelte.config.js` file with the following:

```js
import adapter from '@sveltejs/adapter-auto';
import { preprocessMeltUI } from '@melt-ui/pp';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sequence from 'svelte-sequential-preprocessor';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sequence([
		vitePreprocess(),
		preprocessMeltUI()
	])
};

export default config;
```

> After deploying, make sure to update the final URL in the `VITE_APP_URL` environment variable
