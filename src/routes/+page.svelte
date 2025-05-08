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

	let ePile = $state([]);
	let pPile = $state([]);

	let eCard = $derived(eDeck.length > 0 ? eDeck[0] : {});
	let pCard = $derived(pDeck.length > 0 ? pDeck[0] : {});

	let winState = $state('');
	let winStateGen = $state(null);
</script>

<svelte:head><title>War | Card Game</title></svelte:head>

<div class="[ relative justify-self-center ]">
	{#each [...eDeck].slice(1).reverse() as card, i}
		<div
			class="[ absolute -translate-y-[-5%] -translate-x-1/2 ] [ drop-shadow-sm ]"
			style="top: {-1 * i}px; left: {-1 * i}px; z-index: {i};"
		>
			<CardPile rank={card.rank} value={card.value} suit={card.suit} />
		</div>
	{/each}
	{#each [...ePile].slice(1).reverse() as card, i}
		<div
			class="[ absolute -translate-y-[-5%] -translate-x-[-75%] ] [ drop-shadow-sm ]"
			style="top: {-1 * i}px; left: {-1 * i}px; z-index: {i};"
		>
			<CardPile rank={card.rank} value={card.value} suit={card.suit} />
		</div>
	{/each}
</div>
<CardElement class="justify-self-center" rank={eCard.rank} value={eCard.value} suit={eCard.suit} />
<div class="[ relative ]">
	{#if winState === 'wE' || winState === 'wP' || winState === 'd'}
		{#each eDeck.slice(1, Math.min(4, eDeck.length)) as card, i}
			<div class="[ absolute ] [ drop-shadow-sm ]" style="left: {40 * i}px; z-index: {i};">
				<CardPile rank={card.rank} value={card.value} suit={card.suit} />
			</div>
		{/each}
		{#if eDeck.length >= 5}
			<div class="[ absolute left-[120px] z-99 ] [ drop-shadow-md ]">
				<CardElement rank={eDeck[4]?.rank} value={eDeck[4]?.value} suit={eDeck[4]?.suit} />
			</div>
		{/if}
	{/if}
</div>

<div class="[ relative justify-self-center ]">
	{#each [...pDeck].slice(1).reverse() as card, i}
		<div
			class="[ absolute -translate-y-[-15%] -translate-x-1/2 ] [ drop-shadow-sm ]"
			style="top: {-1 * i}px; left: {-1 * i}px; z-index: {i};"
		>
			<CardPile rank={card.rank} value={card.value} suit={card.suit} />
		</div>
	{/each}
	{#each [...pPile].slice(1).reverse() as card, i}
		<div
			class="[ absolute -translate-y-[-15%] -translate-x-[-75%] ] [ drop-shadow-sm ]"
			style="top: {-1 * i}px; left: {-1 * i}px; z-index: {i};"
		>
			<CardPile rank={card.rank} value={card.value} suit={card.suit} />
		</div>
	{/each}
</div>
<div class="justify-self-center mt-auto">
	<CardElement rank={pCard.rank} value={pCard.value} suit={pCard.suit} />
</div>
<div class="[ relative ]">
	{#if winState === 'wE' || winState === 'wP' || winState === 'd'}
		{#each pDeck.slice(1, Math.min(4, pDeck.length)) as card, i}
			<div
				class="[ absolute -translate-y-[-15%] ] [ drop-shadow-sm ]"
				style="left: {40 * i}px; z-index: {i};"
			>
				<CardPile rank={card.rank} value={card.value} suit={card.suit} />
			</div>
		{/each}
		{#if pDeck.length >= 5}
			<div class="[ absolute -translate-y-[-15%] left-[120px] z-99 ] [ drop-shadow-md ]">
				<CardElement rank={pDeck[4]?.rank} value={pDeck[4]?.value} suit={pDeck[4]?.suit} />
			</div>
		{/if}
	{/if}
</div>

<div class="absolute top-4 left-4 flex flex-col gap-4">
	<div class="text-sm">
		<div>Enemy Deck: {eDeck.length}</div>
		<div>Enemy Pile: {ePile.length}</div>
	</div>
	<div class="text-sm">
		<div>Player Deck: {pDeck.length}</div>
		<div>Player Pile: {pPile.length}</div>
	</div>
</div>

<button
	class="[ absolute top-4 right-14 rounded-sm ] [ px-6 ] [ hover:cursor-pointer ] [ bg-lsb hover:bg-ltb dark:bg-dsb dark:hover:bg-dtb ]"
	onclick={() => {
		if (!winStateGen) {
			winStateGen = handleWinState(eDeck, pDeck, eCard, pCard, winState, ePile, pPile);
			const result = winStateGen.next();

			if (!result.done) {
				winState = result.value.winState;
			} else {
				winStateGen = null;
			}
		} else {
			const result = winStateGen.next();

			if (!result.done) {
				const {
					eDeck: newEDeck,
					pDeck: newPDeck,
					ePile: newEPile,
					pPile: newPPile,
					winState: newWinState
				} = result.value;
				eDeck = newEDeck;
				pDeck = newPDeck;
				ePile = newEPile;
				pPile = newPPile;
				winState = newWinState;

				winStateGen = null;
			} else {
				winStateGen = null;
			}
		}
	}}
>
	flip
</button>
<p class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
	{#if winState === 'e'}
		YOU LOSE!
	{:else if winState === 'p'}
		YOU WIN!
	{:else if winState === 'wE'}
		WAR!
	{:else if winState === 'wP'}
		WAR!
	{/if}
</p>
<p class="absolute top-1/2 -translate-y-1/2 right-1/6">
	{#if winState === 'wE'}
		YOU LOSE!
	{:else if winState === 'wP'}
		YOU WIN!
	{:else if winState === 'd'}
		DRAW!
	{/if}
</p>
