// @ts-nocheck
import { ID, Query, Permission, Role } from "appwrite";
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
    },
    [Permission.write(Role.user(userId)), Permission.read(Role.user(userId))]
  );
}

async function deleteImage(documentId) {
  await databases.deleteDocument(databaseId,
    collectionId,
    documentId
  );
}

export const db = {
  listImages,
  addImage,
  deleteImage
};