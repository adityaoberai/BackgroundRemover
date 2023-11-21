// @ts-nocheck
import { ID, Query } from "appwrite";
import { databases } from "$lib/appwrite";

async function listImages(userId, limit, page) {
  return await databases.listDocuments('imagedb', 
    'images',
    [
      Query.equalTo('userId', userId),
      Query.limit(limit),
      Query.offset(page*limit),
      Query.orderDesc('$createdAt')
    ]
  );
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

export const imageDb = {
  listImages,
  addImage
};
