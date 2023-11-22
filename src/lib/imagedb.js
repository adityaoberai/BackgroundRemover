// @ts-nocheck
import { ID, Query } from "appwrite";
import { databases } from "$lib/appwrite";
import { user } from "./user";

async function listImages() {
  var imageList = await databases.listDocuments('imagedb', 
    'images',
    [
      Query.orderDesc('$createdAt')
    ]
  );
  console.log(imageList);
  return imageList.documents;
}

async function addImage(userId, imageId) {
  return await databases.createDocument('imagedb', 
    'images',
    ID.unique(),
    {
      userId: userId,
      imageId: imageId
    }
  );
}

async function deleteImage(documentId) {
  await databases.deleteDocument('imagedb',
    'images',
    documentId
  ); 
  location.reload();
}

export const imageDb = {
  listImages,
  addImage,
  deleteImage
};