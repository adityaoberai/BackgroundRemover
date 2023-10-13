// @ts-nocheck
import { writable } from "svelte/store";
import { ID } from "appwrite";
import { goto } from "$app/navigation";
import { account } from "$lib/appwrite";

const store = writable(null);

async function init() {
  try {
    store.set(await account.get());
  } catch (e) {
    goto("/auth/login");
  }
}

async function register(name, email, password) {
  await account.create(ID.unique(), email, password, name);
  await login(email, password);
}

async function login(email, password) {
  await account.createEmailSession(email, password);
  await init();
  goto("/app");
}

async function logout() {
  await account.deleteSession("current");
  store.set(null);
  goto("/");
}

async function createJWT () {
  return (await account.createJWT()).jwt;
}

export const user = {
  subscribe: store.subscribe, 
  register,
  login,
  logout,
  init,
  createJWT
};
