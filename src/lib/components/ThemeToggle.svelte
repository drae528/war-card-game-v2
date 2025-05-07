<script>
	import { theme } from '$lib/stores/theme';
	import { Moon, Sun } from '@lucide/svelte';

	let isDark = $derived($theme === 'dark');

	const toggleTheme = () => {
		theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
	};
</script>

<button onclick={toggleTheme}>
	<div
		class="[ h-8 w-8 rounded-sm ] [ grid place-items-center ] [ hover:cursor-pointer hover:opacity-80 ] [ bg-lsb dark:bg-dsb ]"
	>
		{#if isDark}
			<Sun />
		{:else}
			<Moon />
		{/if}
	</div>
</button>
