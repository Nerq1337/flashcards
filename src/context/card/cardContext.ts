import { ICard, ICardSet } from '../../types/card';

import { createContext } from 'react';


export interface ICardContext {
	cardSets: ICardSet[];
	currentCardSetID: ICardSet['id'];
	setCurrentCardSetID: (set: ICardSet['id']) => void;
	setCardSetsFromStorage: () => void;

	addCardSet: (name: ICardSet['name']) => void;
	getCardSet: (id: ICardSet['id']) => ICardSet | undefined;
	removeCardSet: (id: ICardSet['id'], isInModal?: boolean) => boolean;
	renameCardSet: (id: ICardSet['id'], name: ICardSet['name']) => void;

	addCard: (setID: ICardSet['id'], ...card: ICard[]) => void;
	removeCard: (setID: ICardSet['id'], cardID: ICard['id']) => void;
	editCard: (setID: ICardSet['id'], newCard: ICard) => void;

	isCardsEditing: boolean;
	setIsCardsEditing: (value: boolean) => void;
	startCardsEdit: () => void;
	cancelCardsEdit: () => void;

	getConfig: () => string;
	setConfig: (config: string) => void;
}

export const CardContext = createContext<ICardContext>({
	cardSets: [],
	currentCardSetID: -1,
	setCurrentCardSetID: () => {},
	setCardSetsFromStorage: () => {},

	addCardSet: () => {},
	getCardSet: () => undefined,
	removeCardSet: () => false,
	renameCardSet: () => {},

	addCard: () => {},
	removeCard: () => {},
	editCard: () => {},

	isCardsEditing: false,
	setIsCardsEditing: () => {},
	startCardsEdit: () => {},
	cancelCardsEdit: () => {},

	getConfig: () => '',
	setConfig: () => {},
});