import { Client, Account, Functions } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('bgremover');

export const account = new Account(client);

export const functions = new Functions(client);