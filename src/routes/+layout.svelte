<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		theme.subscribe((value) => {
			document.documentElement.setAttribute('data-theme', value);
		});
	});

	let { children } = $props();
</script>

{@render children()}

<div class="[ absolute top-4 right-4 ]">
	<ThemeToggle />
</div>
