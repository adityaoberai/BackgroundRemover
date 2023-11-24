// @ts-nocheck
import { addToast } from "../components/Toaster.svelte";

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