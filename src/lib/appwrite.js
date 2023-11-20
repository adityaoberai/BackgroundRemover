import { Client, Account, Functions, Storage } from 'appwrite';

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('bgremover');

export const account = new Account(client);

export const functions = new Functions(client);

export const storage = new Storage(client);