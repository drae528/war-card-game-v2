<script>
	import { theme } from '$lib/stores/theme';

	const toggleTheme = () => {
		theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
	};
</script>

<button onclick={toggleTheme}> Toggle Theme </button>
