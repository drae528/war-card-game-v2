import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const storedTheme = browser ? localStorage.getItem('theme') || 'dark' : 'light';
export const theme = writable(storedTheme);

if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
	});
}
