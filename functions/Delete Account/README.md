# Delete Account

Deletes an account, related documents and files in the Background Remover Appwrite project

## ⚙️ Configuration

| Setting           | Value         |
|-------------------|---------------|
| Runtime           | Node (18.0)   |
| Entrypoint        | `src/main.js` |
| Build Commands    | `npm install` |
| Permissions       | `any`         |
| Timeout (Seconds) | 60            |

## 🔒 Environment Variables

- `APPWRITE_OUTPUT_IMAGES_BUCKET_ID`: Id of storage bucket containing output images
- `APPWRITE_API_KEY`: Appwrite API key with `user.read`, `user.write`, `documents.read`, `documents.write`, `files.read`, and `files.write` scopes
- `APPWRITE_PROJECT_ID`: Id of Appwrite project for the Background Remover app
- `APPWRITE_DATABASE_ID`: Id of Appwrite database containing collection of user and file ids
- `APPWRITE_COLLECTION_ID`: Id of Appwrite containing containing user and file Ids for user profiles
