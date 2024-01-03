// @ts-nocheck
import { storage } from "$lib/appwrite";
import { ID, Permission, Role } from "appwrite";

async function uploadInputImage(bucketId, file) {
    return await storage.createFile(bucketId, 
        ID.unique(),
        file
    );
}

async function uploadOutputImage(bucketId, blob, userId) {
    return await storage.createFile(bucketId, 
        ID.unique(),
        new File([blob], 'image.png'),
        [Permission.write(Role.user(userId)), Permission.read(Role.user(userId))]
    );

}

async function deleteImage(bucketId, imageId) {
    await storage.deleteFile(bucketId, imageId);
}

function viewImage(bucketId, imageId) {
    return storage.getFileView(bucketId, imageId).href;
}

function previewImage(bucketId, imageId, width) {
    return storage.getFilePreview(bucketId, imageId, width).href;
}

function downloadImage(bucketId, imageId) {
    return storage.getFileDownload(bucketId, imageId);
}

export const images = {
    uploadInputImage,
    uploadOutputImage,
    deleteImage,
    viewImage,
    previewImage,
    downloadImage
};