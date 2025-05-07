export function handleWinState(eDeck, pDeck, eCard, pCard, winState, warPile = []) {
	if (!eDeck || !pDeck || !eCard || !pCard) {
		console.error('invalid parameters');
		return { eDeck, pDeck, winState };
	}

	warPile = [...warPile, eCard, pCard];

	if (eCard.value > pCard.value) {
		eDeck = [...eDeck.slice(1), ...warPile];
		pDeck = pDeck.slice(1);
		winState = 'e';
	} else if (eCard.value < pCard.value) {
		pDeck = [...pDeck.slice(1), ...warPile];
		eDeck = eDeck.slice(1);
		winState = 'p';
	} else {
		if (eDeck.length >= 4 && pDeck.length >= 4) {
			const eWarCards = eDeck.slice(1, 5);
			const pWarCards = pDeck.slice(1, 5);

			warPile = [...warPile, ...eWarCards, ...pWarCards];

			eDeck = eDeck.slice(5);
			pDeck = pDeck.slice(5);

			const eWarCard = eWarCards[3];
			const pWarCard = pWarCards[3];

			handleWinState(eDeck, pDeck, eWarCard, pWarCard, winState, warPile);
		} else {
			if (eDeck.length > pDeck.length) {
				winState = 'e';
			} else if (eDeck.length < pDeck.length) {
				winState = 'p';
			} else {
				winState = 'd';
			}
		}
	}

	return { eDeck, pDeck, winState };
}
