<script>
	import CardElement from '$lib/components/CardElement.svelte';
	import CardPile from '$lib/components/CardPile.svelte';

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

<div class="[ relative ]">
	<CardPile rank={eCard.rank} value={eCard.value} suit={eCard.suit} />
</div>
<CardElement rank={eCard.rank} value={eCard.value} suit={eCard.suit} />
<p></p>

<CardPile rank={pCard.rank} value={pCard.value} suit={pCard.suit} />
<CardElement rank={pCard.rank} value={pCard.value} suit={pCard.suit} />
