import { FC, KeyboardEvent, useEffect, useState } from 'react';

import { ICard } from '../../../types/card';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import useFocus from '../../../hooks/useFocus';
import useModal from '../../../hooks/useModal';
import useCard from '../../../hooks/useCard';

import './ModalCard.scss';


const ModalCard: FC = () => {
	const [frontEdit, setFrontEdit] = useState(true);
	const { addCard, editCard } = useCard();

	const inputFrontTitle = useFocus<HTMLInputElement>();
	const inputBackTitle = useFocus<HTMLInputElement>();

	const { modalFlashcard } = useModal();

	const [inputCard, setInputCard] = useState<Omit<ICard, 'id'>>({
		front: {
			title: '',
			description: '',
		},
		back: {
			title: '',
			description: '',
		},
	});

	useEffect(() => {
		if (modalFlashcard.editable) {
			setInputCard(modalFlashcard.editable);
		}
	}, [modalFlashcard.editable]);

	useEffect(() => {
		if (frontEdit) {
			inputFrontTitle.setFocus();
		} else {
			inputBackTitle.setFocus();
		}
	}, [frontEdit, modalFlashcard.visible]);

	const next = () => {
		if (inputCard.front.title) {
			setFrontEdit(false);
			return;
		}

		const inputClasses = inputFrontTitle.ref.current!.className;

		inputFrontTitle.ref.current!.className = `${inputClasses} shake-anim`;

		setTimeout(() => {
			inputFrontTitle.ref.current!.className = inputClasses;
		}, 600);
	};

	const submit = () => {
		const newCard: ICard = {
			...inputCard,
			id: modalFlashcard.editable ? modalFlashcard.editable.id : Date.now(),
		};

		if (modalFlashcard.editable) {
			editCard(modalFlashcard.cardSetID, newCard);
			modalFlashcard.setEditable(null);
		} else {
			addCard(modalFlashcard.cardSetID, newCard);
		}

		setInputCard({
			front: {
				title: '',
				description: '',
			},
			back: {
				title: '',
				description: '',
			},
		});

		modalFlashcard.setVisible(false);
		setFrontEdit(true);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key !== 'Enter') {
			return;
		}

		frontEdit
			? next()
			: submit();
	};

	return (
		<Modal
			visible={modalFlashcard.visible} setVisible={modalFlashcard.setVisible}
			hideCallback={() => setFrontEdit(true)}
		>
			<div className={'create-card'} onKeyDown={onKeyDown}>
				<h2 className={'create-card__title'}>
					{modalFlashcard.editable ? 'Edit flashcard' : 'Create flashcard'}
				</h2>
				<h3 className={'create-card__subtitle'}>
					{frontEdit ? 'Front' : 'Back'}
				</h3>

				<div className="create-card__inputs">
					{frontEdit
						? <>
							<Input
								ref={inputFrontTitle.ref}
								onChange={e => setInputCard({
									...inputCard,
									front: { ...inputCard.front, title: e.target.value },
								})}
								value={inputCard.front.title} label={'title'}
							/>
							<Input
								onChange={e => setInputCard({
									...inputCard,
									front: { ...inputCard.front, description: e.target.value },
								})}
								value={inputCard.front.description} label={'description'}
							/>
						</>
						:
						<div className="create-card__inputs">
							<Input
								ref={inputBackTitle.ref}
								onChange={e => setInputCard({
									...inputCard,
									back: { ...inputCard.back, title: e.target.value },
								})}
								value={inputCard.back.title} label={'title'}
							/>
							<Input
								onChange={e => setInputCard({
									...inputCard,
									back: { ...inputCard.back, description: e.target.value },
								})}
								value={inputCard.back.description} label={'description'}
							/>
						</div>
					}
				</div>

				<div className={'create-card__buttons'}>
					{frontEdit
						? <Button onClick={next} Color="gradient-violet">
							next
						</Button>
						: <>
							<Button onClick={() => { setFrontEdit(true); }}>
								back
							</Button>
							<Button onClick={submit} Color="gradient-violet">
								{modalFlashcard.editable ? 'save' : 'create'}
							</Button>
						</>
					}
				</div>

			</div>
		</Modal>
	);
};

export default ModalCard;