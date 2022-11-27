import { createContext } from 'react';

import { ICard, ICardSet } from '../../types/card';
import { ModalAlertProps } from '../../types/modal';

export interface IModalsContext {
	modalFlashcardSet: {
		visible: boolean;
		setVisible: (value: boolean) => void;
		editable: ICardSet | null;
		setEditable: (set: ICardSet | null) => void;
	};
	modalFlashcard: {
		visible: boolean;
		setVisible: (value: boolean) => void;
		editable: ICard | null;
		setEditable: (card: ICard | null) => void;
		cardSetID: number;
		setCardSetID: (id: number) => void;
	};
	modalTest: {
		visible: boolean;
		setVisible: (value: boolean) => void;
	};
	modalAlert: {
		show: (props: ModalAlertProps) => void;
		hide: () => void;
	};
}

export const ModalContext = createContext<IModalsContext>({
	modalFlashcardSet: {
		visible: false,
		setVisible: () => {},
		editable: null,
		setEditable: () => {},
	},
	modalFlashcard: {
		visible: false,
		setVisible: () => {},
		editable: null,
		setEditable: () => {},
		cardSetID: -1,
		setCardSetID: () => {},
	},
	modalTest: {
		visible: false,
		setVisible: () => {},
	},
	modalAlert: {
		show: () => {},
		hide: () => {},
	},
});