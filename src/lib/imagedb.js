// @ts-nocheck
import { ID, Query } from "appwrite";
import { databases } from "$lib/appwrite";
import { PUBLIC_APPWRITE_COLLECTION_ID, PUBLIC_APPWRITE_DATABASE_ID } from '$env/static/public';

const databaseId = PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = PUBLIC_APPWRITE_COLLECTION_ID;

async function listImages() {
  var imageList = await databases.listDocuments(databaseId, 
    collectionId,
    [
      Query.orderDesc('$createdAt')
    ]
  );
  return imageList.documents;
}

async function addImage(userId, imageId) {
  return await databases.createDocument(databaseId, 
    collectionId,
    ID.unique(),
    {
      userId: userId,
      imageId: imageId
    }
  );
}

async function deleteImage(documentId) {
  await databases.deleteDocument(databaseId,
    collectionId,
    documentId
  );
}

export const imageDb = {
  listImages,
  addImage,
  deleteImage
};