import { Client, Account, Functions, Storage, Databases } from 'appwrite';

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('bgremover');

export const account = new Account(client);

export const functions = new Functions(client);

export const storage = new Storage(client);

export const databases = new Databases(client);