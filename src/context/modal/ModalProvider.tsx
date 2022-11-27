import { FC, ReactNode, useState } from 'react';

import { IModalsContext, ModalContext } from './modalContext';
import { ICard, ICardSet } from '../../types/card';
import { ModalAlertProps } from '../../types/modal';

import ModalCardSet from '../../components/modals/ModalCardSet/ModalCardSet';
import ModalCard from '../../components/modals/ModalCard/ModalCard';
import ModalTest from '../../components/modals/ModalTest/ModalTest';
import ModalAlert from '../../components/modals/ModalAlert/ModalAlert';


interface ModalProviderProps {
	children: ReactNode;
}

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
	/* ModalFlashcardSet */
	const [modalFlashcardSetVisible, setModalFlashcardSetVisible] = useState(false);
	const [editableFlashcardSet, setEditableFlashcardSet] = useState<ICardSet | null>(null);

	/* ModalFlashcard */
	const [modalFlashcardVisible, setModalFlashcardVisible] = useState(false);
	const [editableFlashcard, setEditableFlashcard] = useState<ICard | null>(null);
	const [modalFlashcardSetID, setModalFlashcardSetID] = useState(-1);

	/* ModalTest */
	const [modalTestVisible, setModalTestVisible] = useState(false);

	/* ModalAlert */
	const [modalAlertVisible, setModalAlertVisible] = useState(false);
	const [modalAlertProps, setModalAlertProps] = useState<ModalAlertProps>(
		{ title: '', icon: 'success', text: '' },
	);

	const modalAlertShow = (props: ModalAlertProps) => {
		setModalAlertProps(props);
		setModalAlertVisible(true);
	};

	const modalAlertHide = () => {
		setModalAlertVisible(false);
	};

	const value: IModalsContext = {
		modalFlashcardSet: {
			visible: modalFlashcardSetVisible,
			setVisible: setModalFlashcardSetVisible,
			editable: editableFlashcardSet,
			setEditable: setEditableFlashcardSet,
		},
		modalFlashcard: {
			visible: modalFlashcardVisible,
			setVisible: setModalFlashcardVisible,
			editable: editableFlashcard,
			setEditable: setEditableFlashcard,
			cardSetID: modalFlashcardSetID,
			setCardSetID: setModalFlashcardSetID,
		},
		modalTest: {
			visible: modalTestVisible,
			setVisible: setModalTestVisible,
		},
		modalAlert: {
			show: modalAlertShow,
			hide: modalAlertHide,
		},
	};

	return (
		<ModalContext.Provider value={value}>
			<ModalCardSet/>
			<ModalCard/>
			<ModalTest/>
			<ModalAlert visible={modalAlertVisible} setVisible={setModalAlertVisible} props={modalAlertProps}/>

			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;