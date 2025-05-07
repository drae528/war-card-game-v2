<script>
	import { Club, Diamond, Heart, Spade } from '@lucide/svelte';

	let { rank, value, suit } = $props();
</script>

{#snippet cardFace(suit, outline = true)}
	{#if suit === 'clubs'}
		{#if outline}
			<Club fill="var(--color-club)" size="52" strokeWidth="1.5" />
		{:else}
			<Club color="var(--color-club)" fill="var(--color-club)" size="52" strokeWidth="1.5" />
		{/if}
	{:else if suit === 'diamonds'}
		{#if outline}
			<Diamond fill="var(--color-diamond)" size="52" strokeWidth="1.5" />
		{:else}
			<Diamond
				color="var(--color-diamond)"
				fill="var(--color-diamond)"
				size="52"
				strokeWidth="1.5"
			/>
		{/if}
	{:else if suit === 'hearts'}
		{#if outline}
			<Heart fill="var(--color-heart)" size="52" strokeWidth="1.5" />
		{:else}
			<Heart color="var(--color-heart)" fill="var(--color-heart)" size="52" strokeWidth="1.5" />
		{/if}
	{:else if suit === 'spades'}
		{#if outline}
			<Spade fill="var(--color-spade)" size="52" strokeWidth="1.5" />
		{:else}
			<Spade color="var(--color-spade)" fill="var(--color-spade)" size="52" strokeWidth="1.5" />
		{/if}
	{:else}
		<span>icon error</span>
	{/if}
{/snippet}

<div class="[ relative h-[18rem] w-[12rem] rounded-sm ] [ bg-ltb dark:bg-dtb ]">
	<div
		class="[ absolute top-1/2 -translate-y-4/4 left-1/2 -translate-x-1/2 transform scale-y-[-1] ]"
	>
		{@render cardFace(suit, false)}
	</div>
	<div class="[ absolute top-1/2 -translate-y-1/4 left-1/2 -translate-x-1/2 ]">
		{@render cardFace(suit, false)}
	</div>
</div>
