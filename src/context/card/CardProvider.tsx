import { FC, ReactNode, useEffect, useState } from 'react';

import { ICard, ICardSet } from '../../types/card';

import { CardContext, ICardContext } from './cardContext';

interface CardsProviderProps {
	children: ReactNode;
}

enum LocalStorage {
	CARDS_SETS = 'card_sets'
}

const CardProvider: FC<CardsProviderProps> = ({ children }) => {
	const [cardSets, setCardSets] = useState<ICardSet[]>([]);
	const [currentCardSetID, setCurrentCardSetID] = useState<ICardSet['id']>(-1);
	const [cardSetsSave, setCardSetsSave] = useState<ICardSet[]>([]);

	const [isCardsEditing, setIsCardsEditing] = useState(false);

	useEffect(() => {
		setCardSetsFromStorage();
	}, []);

	const setCardSetsFromStorage = () => {
		const storageSets = localStorage.getItem(LocalStorage.CARDS_SETS);

		if (storageSets) {
			setCardSets(JSON.parse(storageSets));
		}
	};

	const getCardSet = (id: ICardSet['id']) => {
		return cardSets.find(cardSet => cardSet.id === id);
	};

	const addCardSet = (name: ICardSet['name']) => {
		let newID = 0;
		cardSets.forEach(
			cardSet => newID = cardSet.id > newID ? cardSet.id : newID,
		);

		const newSets = [
			...cardSets,
			{
				id: newID + 1,
				cards: [],
				name,
			},
		];

		setCardSets(newSets);
		localStorage.setItem(LocalStorage.CARDS_SETS, JSON.stringify(newSets));
	};

	const removeCardSet = (id: ICardSet['id'], isInModal = true) => {
		const targetSet = cardSets.filter(cardSet => cardSet.id === id);

		if (!isInModal && targetSet[0].cards.length !== 0) {
			return false;
		}

		const newSets = cardSets.filter(cardSet => cardSet.id !== id);

		setCardSets(newSets);
		localStorage.setItem(LocalStorage.CARDS_SETS, JSON.stringify(newSets));

		return true;
	};

	const renameCardSet = (id: ICardSet['id'], name: ICardSet['name']) => {
		const newSets = cardSets.map(set =>
			set.id === id ? { ...set, name: name } : set,
		);

		setCardSets(newSets);
		localStorage.setItem(LocalStorage.CARDS_SETS, JSON.stringify(newSets));
	};

	const addCard = (setID: ICardSet['id'], ...card: ICard[]) => {
		const newSets = cardSets.map(cardSet =>
			cardSet.id === setID
				? { ...cardSet, cards: [...card, ...cardSet.cards] }
				: cardSet,
		);

		setCardSets(newSets);
		localStorage.setItem(LocalStorage.CARDS_SETS, JSON.stringify(newSets));
	};

	const removeCard = (setID: ICardSet['id'], cardID: ICard['id'], isInModal = false) => {
		const newSets = cardSets.map(cardSet =>
			cardSet.id === setID
				? { ...cardSet, cards: cardSet.cards.filter(card => card.id !== cardID) }
				: cardSet,
		);

		setCardSets(newSets);
		localStorage.setItem(LocalStorage.CARDS_SETS, JSON.stringify(newSets));
	};

	const startCardsEdit = () => {
		setIsCardsEditing(true);
		setCardSetsSave(cardSets);
	};

	const cancelCardsEdit = () => {
		setIsCardsEditing(false);
		setCardSets(cardSetsSave);
	};

	const editCard = (setID: ICardSet['id'], newCard: ICard) => {
		const targetSet = getCardSet(setID);
		if (!targetSet) {
			return;
		}

		const newSet: ICardSet = {
			...targetSet,
			cards: targetSet.cards.map(card => card.id === newCard.id ? newCard : card),
		};

		const newSets = cardSets.map(cardSet =>
			cardSet.id === setID ? newSet : cardSet,
		);

		setCardSets(newSets);
		localStorage.setItem(LocalStorage.CARDS_SETS, JSON.stringify(newSets));
	};

	const getConfig = (): string => {
		return localStorage.getItem(LocalStorage.CARDS_SETS) || '';
	};

	const setConfig = (config: string) => {
		localStorage.setItem(LocalStorage.CARDS_SETS, config);
		setCardSetsFromStorage();
	};

	const value: ICardContext = {
		cardSets,
		addCard,
		getCardSet,
		addCardSet,
		removeCardSet,
		editCard,
		isCardsEditing,
		setIsCardsEditing,
		startCardsEdit,
		cancelCardsEdit,
		removeCard,
		renameCardSet,
		currentCardSetID,
		setCurrentCardSetID,
		setCardSetsFromStorage,
		getConfig,
		setConfig,
	};

	return (
		<CardContext.Provider value={value}>
			{children}
		</CardContext.Provider>
	);
};
export default CardProvider;