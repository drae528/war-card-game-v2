<script>
	import CardElement from '$lib/components/CardElement.svelte';
	import CardPile from '$lib/components/CardPile.svelte';

	let { data } = $props();

	let enemyDeck = $state(data.enemyDeck);
	let playerDeck = $state(data.playerDeck);
	$effect(() => {
		enemyDeck = data.enemyDeck || [];
		playerDeck = data.playerDeck || [];
	});

	let enemyPile = $state([]);
	let playerPile = $state([]);

	let eCard = $derived(enemyDeck[0] || {});
	let pCard = $derived(playerDeck[0] || {});
</script>

<svelte:head><title>War | Card Game</title></svelte:head>

<div class="[ relative ]">
	{#each [...enemyDeck].slice(1).reverse() as card, i}
		<div
			class="[ absolute -translate-y-1/2 -translate-x-1/2 ] [ drop-shadow-sm ]"
			style="top: {-1 * i}px; left: {-1 * i}px; z-index: {i};"
		>
			<CardPile rank={card.rank} value={card.value} suit={card.suit} />
		</div>
	{/each}
</div>
<CardElement rank={eCard.rank} value={eCard.value} suit={eCard.suit} />
<p></p>

<div class="[ relative ]">
	{#each [...playerDeck].slice(1).reverse() as card, i}
		<div
			class="[ absolute -translate-y-1/2 -translate-x-1/2 ] [ drop-shadow-sm ]"
			style="top: {-1 * i}px; left: {-1 * i}px; z-index: {i};"
		>
			<CardPile rank={card.rank} value={card.value} suit={card.suit} />
		</div>
	{/each}
</div>
<CardElement rank={pCard.rank} value={pCard.value} suit={pCard.suit} />
