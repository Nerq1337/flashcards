import { FC } from 'react';

import Button from '../../UI/Button/Button';

import useCard from '../../../hooks/useCard';
import useModal from '../../../hooks/useModal';
import { useNavigate } from 'react-router-dom';

import { GrAdd } from 'react-icons/gr';
import { RiArrowGoBackLine } from 'react-icons/ri';

import './CardSetPanel.scss';


interface FlashcardSetPanelProps {
	label: string;
}

const CardSetPanel: FC<FlashcardSetPanelProps> = ({ label }) => {
	const navigate = useNavigate();

	const { setIsCardsEditing, cancelCardsEdit, startCardsEdit, isCardsEditing, currentCardSetID } = useCard();
	const { modalFlashcard, modalTest } = useModal();

	const buttonAdd = () => {
		modalFlashcard.setCardSetID(currentCardSetID);
		modalFlashcard.setVisible(true);
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
					<Button
						style={{ marginLeft: 12 }}
						Size='icon' Color='gradient-green-blue'
						onClick={buttonAdd}
					>
						<GrAdd size={22}/>
					</Button>
				}
			</div>

			{isCardsEditing
				? <div className={'set-panel__buttons'}>
					<Button onClick={cancelCardsEdit}>cancel</Button>
					<Button
						onClick={() => setIsCardsEditing(false)}
						Color='gradient-green-blue'
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
						Color='gradient-rainbow'
					>
						test
					</Button>
				</div>
			}
		</div>
	);
};

export default CardSetPanel;