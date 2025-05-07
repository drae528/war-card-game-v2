<script>
	import CardElement from '$lib/components/CardElement.svelte';
	import CardPile from '$lib/components/CardPile.svelte';
	import { handleWinState } from '$lib/utils/winStateHandler';

	let { data } = $props();

	let eDeck = $state(data.enemyDeck);
	let pDeck = $state(data.playerDeck);
	$effect(() => {
		eDeck = data.enemyDeck || [];
		pDeck = data.playerDeck || [];
	});

	let enemyPile = $state([]);
	let playerPile = $state([]);

	let eCard = $derived(eDeck[0] || {});
	let pCard = $derived(pDeck[0] || {});

	let winState = $state('');
</script>

<svelte:head><title>War | Card Game</title></svelte:head>

<div class="[ relative justify-self-center ]">
	{#each [...eDeck].slice(1).reverse() as card, i}
		<div
			class="[ absolute -translate-y-1/2 -translate-x-1/2 ] [ drop-shadow-sm ]"
			style="top: {-1 * i}px; left: {-1 * i}px; z-index: {i};"
		>
			<CardPile rank={card.rank} value={card.value} suit={card.suit} />
		</div>
	{/each}
</div>
<CardElement class="justify-self-center" rank={eCard.rank} value={eCard.value} suit={eCard.suit} />
<p></p>

<div class="[ relative justify-self-center ]">
	{#each [...pDeck].slice(1).reverse() as card, i}
		<div
			class="[ absolute -translate-y-1/2 -translate-x-1/2 ] [ drop-shadow-sm ]"
			style="top: {-1 * i}px; left: {-1 * i}px; z-index: {i};"
		>
			<CardPile rank={card.rank} value={card.value} suit={card.suit} />
		</div>
	{/each}
</div>
<CardElement
	class="justify-self-center mt-auto"
	rank={pCard.rank}
	value={pCard.value}
	suit={pCard.suit}
/>
<div class="[ ] [ flex items-end ]">
	<button
		class="[ rounded-sm ] [ px-6 py-1 upper ] [ hover:cursor-pointer ] [ bg-lsb hover:bg-ltb dark:bg-dsb dark:hover:bg-dtb ]"
		onclick={() => {
			const {
				eDeck: newEDeck,
				pDeck: newPDeck,
				winState: newWinState
			} = handleWinState(eDeck, pDeck, eCard, pCard, winState);

			eDeck = newEDeck;
			pDeck = newPDeck;
			winState = newWinState;
		}}
	>
		flip
	</button>
</div>
