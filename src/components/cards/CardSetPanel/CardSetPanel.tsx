import { FC } from 'react';

import { ICard } from '../../../types/card';

import Button from '../../UI/Button/Button';

import useCard from '../../../hooks/useCard';
import useModal from '../../../hooks/useModal';
import { useNavigate } from 'react-router-dom';

import { RiArrowGoBackLine } from 'react-icons/ri';
import { BiImport, BiAddToQueue } from 'react-icons/bi';

import './CardSetPanel.scss';


interface FlashcardSetPanelProps {
	label: string;
}

const CardSetPanel: FC<FlashcardSetPanelProps> = ({ label }) => {
	const navigate = useNavigate();

	const {
		addCard, currentCardSetID,
		setIsCardsEditing, cancelCardsEdit, startCardsEdit, isCardsEditing,
	} = useCard();
	const { modalFlashcard, modalTest, modalAlert } = useModal();

	const buttonAdd = () => {
		modalFlashcard.setCardSetID(currentCardSetID);
		modalFlashcard.setVisible(true);
	};

	const buttonImport = async () => {
		let text = ''

		if (!navigator.clipboard) {
			return;
		}

		await navigator.clipboard.readText()
			.then(data => {
				text = data;
			});

		try {
			text = text
				.trim()
				.replaceAll('\t', '')
				.replaceAll(' – ', '-');

			const pairs = text.split('\r\n');

			const cards: ICard[] = pairs.map((pair, index) => {
				const [backTitle, frontTitle] = pair.split('-');

				if (!frontTitle || !backTitle) {
					throw new Error();
				}

				return {
					id: Date.now() + index,
					front: {
						title: frontTitle,
						description: '',
					},
					back: {
						title: backTitle,
						description: '',
					},
				};
			});

			modalAlert.show({
				title: 'Success',
				icon: 'success',
				text: 'The cards were imported!'
			})

			addCard(currentCardSetID, ...cards);
		} catch (err) {
			modalAlert.show({
				title: 'Invalid format!',
				icon: 'error',
				text: 'Example: "front-back"'
			})
		}
	};

	const back = () => {
		navigate('/');
		cancelCardsEdit();
	};

	return (
		<div className={'set-panel'}>
			<div className={'set-panel__left-side'}>
				<button onClick={back} className={'set-panel__button'}>
					<RiArrowGoBackLine className={'set-panel__icon'} size={21}/>
				</button>

				<h1 className={'set-panel__label'}>{label}</h1>

				{isCardsEditing &&
					<div className="set-panel__side-buttons">
						<Button
							Size="icon" Color="gradient-light-blue"
							onClick={buttonAdd}
						>
							<BiAddToQueue size={22}/>
						</Button>
						<Button
							Size="icon" Color="gradient-light-green"
							onClick={buttonImport}
						>
							<BiImport size={22}/>
						</Button>
					</div>
				}
			</div>

			{isCardsEditing
				? <div className={'set-panel__buttons'}>
					<Button onClick={cancelCardsEdit}>cancel</Button>
					<Button
						onClick={() => setIsCardsEditing(false)}
						Color="gradient-green-blue"
					>
						save
					</Button>
				</div>
				: <div className={'set-panel__buttons'}>
					<Button onClick={startCardsEdit}>
						edit
					</Button>
					<Button
						onClick={() => modalTest.setVisible(true)}
						Color="gradient-rainbow"
					>
						test
					</Button>
				</div>
			}
		</div>
	);
};

export default CardSetPanel;