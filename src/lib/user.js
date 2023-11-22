// @ts-nocheck
import { writable } from "svelte/store";
import { ID } from "appwrite";
import { goto } from "$app/navigation";
import { account } from "$lib/appwrite";
import { browser } from "$app/environment";

const isBrowser = typeof window !== 'undefined';

const createUser = () => {
	const store = writable(null);

	async function init() {
    if (!isBrowser) return;
		try {
			store.set(await account.get());
		} catch (e) {
			store.set(null);
		}
	}

	init();

  async function register(name, email, password) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  }

  async function login(email, password) {
    await account.createEmailSession(email, password);
    await init();
    if(browser) {
      goto("/app");
    }
  }

  async function logout() {
    await account.deleteSession("current");
    store.set(null);
    if(browser) {
      goto("/");
    }
  }

  async function createRecovery(email) {
    await account.createRecovery(email, import.meta.env.VITE_APP_URL + "/auth/reset/complete");
    alert("Check your email for a recovery link");
  }

  async function updateRecovery(userId, secret, password, confirmPassword) {
    await account.updateRecovery(userId, secret, password, confirmPassword);
    goto("/auth/login");
  }

  async function updatePassword(oldPassword, newPassword) {
    await account.updatePassword(newPassword, oldPassword);
  }

  return {
    subscribe: store.subscribe, 
    register,
    login,
    logout,
    init,
    createRecovery,
    updateRecovery,
    updatePassword
  }
}

export const user = createUser();
