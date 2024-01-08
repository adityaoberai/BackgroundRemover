// @ts-nocheck
import { Client, Account, Functions, Storage, Databases } from 'appwrite';
import { PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

export const client = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const functions = new Functions(client);

export const storage = new Storage(client);

export const databases = new Databases(client);
