export function* handleWinState(
	eDeck,
	pDeck,
	eCard,
	pCard,
	winState,
	ePile = [],
	pPile = [],
	warPile = []
) {
	if (!eDeck || !pDeck) {
		console.error('invalid parameters');
		return { eDeck, pDeck, ePile, pPile, winState };
	}

	if (eDeck.length === 0) {
		if (ePile.length > 0) {
			eDeck = shuffleArray([...ePile]);
			ePile = [];
		}
	}

	if (pDeck.length === 0) {
		if (pPile.length > 0) {
			pDeck = shuffleArray([...pPile]);
			pPile = [];
		}
	}

	if (eDeck.length === 0 && ePile.length === 0) {
		return { eDeck, pDeck, ePile, pPile, winState: 'p' };
	}

	if (pDeck.length === 0 && pPile.length === 0) {
		return { eDeck, pDeck, ePile, pPile, winState: 'e' };
	}

	eCard = eDeck.length > 0 ? eDeck[0] : {};
	pCard = pDeck.length > 0 ? pDeck[0] : {};

	if (!eCard.value || !pCard.value) {
		return { eDeck, pDeck, ePile, pPile, winState };
	}

	warPile = [...warPile, eCard, pCard];

	let resultWinState;

	if (eCard.value > pCard.value) {
		ePile = [...ePile, ...warPile];
		eDeck = eDeck.slice(1);
		pDeck = pDeck.slice(1);
		resultWinState = 'e';
	} else if (eCard.value < pCard.value) {
		pPile = [...pPile, ...warPile];
		eDeck = eDeck.slice(1);
		pDeck = pDeck.slice(1);
		resultWinState = 'p';
	} else {
		if (eDeck.length < 4 && ePile.length > 0) {
			eDeck = [...eDeck, ...shuffleArray([...ePile])];
			ePile = [];
		}

		if (pDeck.length < 4 && pPile.length > 0) {
			pDeck = [...pDeck, ...shuffleArray([...pPile])];
			pPile = [];
		}

		if (eDeck.length >= 4 && pDeck.length >= 4) {
			const eWarCards = eDeck.slice(1, 5);
			const pWarCards = pDeck.slice(1, 5);

			warPile = [...warPile, ...eWarCards, ...pWarCards];

			eDeck = eDeck.slice(5);
			pDeck = pDeck.slice(5);

			const eWarCard = eWarCards[3];
			const pWarCard = pWarCards[3];

			if (eWarCard.value > pWarCard.value) {
				ePile = [...ePile, ...warPile];
				resultWinState = 'wE';
			} else if (eWarCard.value < pWarCard.value) {
				pPile = [...pPile, ...warPile];
				resultWinState = 'wP';
			} else {
				if (eDeck.length > pDeck.length) {
					ePile = [...ePile, ...warPile];
					resultWinState = 'wE';
				} else if (eDeck.length < pDeck.length) {
					pPile = [...pPile, ...warPile];
					resultWinState = 'wP';
				} else {
					const halfWarPile = Math.floor(warPile.length / 2);
					ePile = [...ePile, ...warPile.slice(0, halfWarPile)];
					pPile = [...pPile, ...warPile.slice(halfWarPile)];
					resultWinState = 'd';
				}
			}
		} else {
			const eRemainingCards = eDeck.slice(1);
			const pRemainingCards = pDeck.slice(1);

			warPile = [...warPile, ...eRemainingCards, ...pRemainingCards];

			eDeck = [];
			pDeck = [];

			const eTotalCards = ePile.length;
			const pTotalCards = pPile.length;

			if (eTotalCards > pTotalCards) {
				ePile = [...ePile, ...warPile];
				resultWinState = 'wE';
			} else if (eTotalCards < pTotalCards) {
				pPile = [...pPile, ...warPile];
				resultWinState = 'wP';
			} else {
				const halfWarPile = Math.floor(warPile.length / 2);
				ePile = [...ePile, ...warPile.slice(0, halfWarPile)];
				pPile = [...pPile, ...warPile.slice(halfWarPile)];
				resultWinState = 'd';
			}
		}
	}

	yield { winState: resultWinState };

	yield { eDeck, pDeck, ePile, pPile, winState: '' };
}

function shuffleArray(array) {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}
