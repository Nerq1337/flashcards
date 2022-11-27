import { FC, KeyboardEvent, useEffect, useState } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import useCard from '../../../hooks/useCard';
import useFocus from '../../../hooks/useFocus';
import useModal from '../../../hooks/useModal';

import './ModalCardSet.scss';


const ModalCardSet: FC = () => {
	const [inputName, setInputName] = useState('');
	const { addCardSet, renameCardSet } = useCard();

	const inputNameFocus = useFocus<HTMLInputElement>();

	const { modalFlashcardSet } = useModal();

	const editableSet = modalFlashcardSet.editable;

	useEffect(() => {
		if (editableSet) {
			setInputName(editableSet.name);
		}
	}, [editableSet]);

	const onClick = () => {
		if (!inputName) {
			const inputClasses = inputNameFocus.ref.current!.className;

			inputNameFocus.ref.current!.className = `${inputClasses} shake-anim`;

			setTimeout(() => {
				inputNameFocus.ref.current!.className = inputClasses;
			}, 600);

			return;
		}

		if (editableSet) {
			renameCardSet(editableSet.id, inputName);
			modalFlashcardSet.setEditable(null);
		} else {
			addCardSet(inputName);
		}

		setInputName('');
		modalFlashcardSet.setVisible(false);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onClick();
		}
	};

	useEffect(() => {
		inputNameFocus.setFocus();
	}, [modalFlashcardSet.visible, inputNameFocus]);

	return (
		<Modal visible={modalFlashcardSet.visible} setVisible={modalFlashcardSet.setVisible}>
			<div className={'create-set'} onKeyDown={onKeyDown}>
				<h2 className={'create-set__title'}>
					{editableSet ? 'Rename set' : 'Create set'}
				</h2>

				<div className="create-set__inputs">
					<Input
						ref={inputNameFocus.ref}
						onChange={e => setInputName(e.target.value)}
						value={inputName} label={'Set title'}
					/>
				</div>

				<div className={'create-set__buttons'}>
					<Button onClick={() => modalFlashcardSet.setVisible(false)}>Cancel</Button>
					<Button onClick={onClick} Color='gradient-violet'>
						{editableSet ? 'save' : 'create'}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ModalCardSet;