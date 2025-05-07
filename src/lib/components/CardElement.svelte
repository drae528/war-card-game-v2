<script>
	import { Club, Diamond, Heart, Spade } from '@lucide/svelte';

	let { class: customClass, rank, value, suit } = $props();
</script>

{#snippet cardIndex(rank, suit)}
	<div class="[ h-fit w-fit ] [ flex flex-col items-center *:h-fit *:w-fit ]">
		<span>{rank}</span>
		{#if suit === 'clubs'}
			<Club fill="var(--color-club)" />
		{:else if suit === 'diamonds'}
			<Diamond fill="var(--color-diamond)" />
		{:else if suit === 'hearts'}
			<Heart fill="var(--color-heart)" />
		{:else if suit === 'spades'}
			<Spade fill="var(--color-spade)" />
		{:else}
			<span>icon error</span>
		{/if}
	</div>
{/snippet}

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

<div class="[ relative h-[18rem] w-[12rem] rounded-sm ] [ bg-lsb dark:bg-dsb ] {customClass}">
	<div class="[ absolute top-3 left-4 ]">
		{@render cardIndex(rank, suit)}
	</div>

	<div
		class="[ absolute top-1/2 -translate-y-4/4 left-1/2 -translate-x-1/2 transform scale-y-[-1] ]"
	>
		{@render cardFace(suit, false)}
	</div>
	<div class="[ absolute top-1/2 -translate-y-1/4 left-1/2 -translate-x-1/2 ]">
		{@render cardFace(suit, false)}
	</div>

	<div class="[ absolute bottom-3 right-4 transform scale-y-[-1] ]">
		{@render cardIndex(rank, suit)}
	</div>
</div>
