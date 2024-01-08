// @ts-nocheck
import { addToast } from '../components/Toaster.svelte';

export function createToast(title, description, color, closeDelay) {
	addToast({
		data: {
			title: title,
			description: description,
			color: color
		},
		closeDelay: closeDelay ?? 5000,
		type: 'foreground'
	});
}

export function deleteAllToasts() {
	let e = document.querySelector('.toastPortal');
	let child = e.lastElementChild;
	while (child) {
		e.removeChild(child);
		child = e.lastElementChild;
	}
}
