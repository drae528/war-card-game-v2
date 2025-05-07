export const load = async () => {
	const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
	const ranks = [
		{ rank: '2', value: 2 },
		{ rank: '3', value: 3 },
		{ rank: '4', value: 4 },
		{ rank: '5', value: 5 },
		{ rank: '6', value: 6 },
		{ rank: '7', value: 7 },
		{ rank: '8', value: 8 },
		{ rank: '9', value: 9 },
		{ rank: '10', value: 10 },
		{ rank: 'J', value: 11 },
		{ rank: 'Q', value: 12 },
		{ rank: 'K', value: 13 },
		{ rank: 'A', value: 14 }
	];

	let deck = [];
	for (let s of suits) {
		for (let r of ranks) {
			deck.push({
				rank: r.rank,
				value: r.value,
				suit: s
			});
		}
	}

	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}

	const half = Math.floor(deck.length / 2);
	let playerDeck = deck.slice(0, half);
	let enemyDeck = deck.slice(half);

	return {
		playerDeck,
		enemyDeck
	};
};
