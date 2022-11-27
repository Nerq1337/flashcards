export interface ICard {
	id: number;
	front: {
		title: string;
		description: string;
	};
	back: {
		title: string;
		description: string;
	};
}

export interface ICardSet {
	id: number;
	name: string;
	cards: ICard[];
}

export interface ICardSetInfo {
	id: ICardSet['id'];
	cardsCount: number;
}