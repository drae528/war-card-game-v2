<script>
	import CardElement from '$lib/components/CardElement.svelte';

	let { data } = $props();

	let playerDeck = $state(data.playerDeck);
	let enemyDeck = $state(data.enemyDeck);
	$effect(() => {
		playerDeck = data.playerDeck || [];
		enemyDeck = data.enemyDeck || [];
	});

	let playerPile = $state([]);
	let enemyPile = $state([]);

	let pCard = $derived(playerDeck[0] || {});
	let eCard = $derived(enemyDeck[0] || {});
</script>

<svelte:head><title>War | Card Game</title></svelte:head>
<CardElement rank={pCard.rank} value={pCard.value} suit={pCard.suit} />
