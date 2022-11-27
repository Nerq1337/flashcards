import { FC, useEffect, useState } from 'react';
import { ICard } from '../../../types/card';

import Button from '../../UI/Button/Button';

import useCard from '../../../hooks/useCard';
import useModal from '../../../hooks/useModal';

import './Card.scss';


interface FlashcardProps {
	card: ICard;
}

const Card: FC<FlashcardProps> = ({ card }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [flipClasses, setFlipClasses] = useState('');

	const { removeCard, isCardsEditing, currentCardSetID } = useCard();

	const { modalFlashcard } = useModal();

	const buttonEdit = () => {
		modalFlashcard.setEditable(card);
		modalFlashcard.setCardSetID(currentCardSetID);
		modalFlashcard.setVisible(true);
	};

	const buttonRemove = () => {
		removeCard(currentCardSetID, card.id);
	};

	useEffect(() => {
		const flipClass = isFlipped ? (Math.random() < 0.5 ? ' flip-right' : ' flip-left') : '';
		setFlipClasses('card__inner' + flipClass);
	}, [isFlipped]);

	return (
		<li className={'card'}
			onClick={() => setIsFlipped(!isFlipped)}
		>
			<div className={flipClasses}>
				<div className={'card__front'}>
					<h2 className={'card__title'}>{card.front.title}</h2>
					<div className={'card__description'}>{card.front.description}</div>

					{isCardsEditing &&
						<div className={'card__buttons'} onClick={e => e.stopPropagation()}>
							<Button onClick={buttonEdit} Size='icon'>
								<svg viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" stroke="#626262" strokeWidth="2"
										  d="m14 4 6 6-6-6Zm8.294 1.294c.39.39.387 1.025-.008 1.42L9 20l-7 2 2-7L17.286 1.714a1 1 0 0 1 1.42-.008l3.588 3.588ZM3 19l2 2m2-4 8-8"
									/>
								</svg>
							</Button>
							<Button onClick={buttonRemove} Size='icon'>
								<svg viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" stroke="#626262" strokeWidth="2"
										  d="M4 5h16v18H4V5ZM1 5h22M9 1h6v4H9V1Zm0 0h6v4H9V1Zm6 8v10M9 9v10"
									/>
								</svg>
							</Button>
						</div>
					}
				</div>
				<div className={'card__back'}>
					<h2 className={'card__title'}>{card.back.title}</h2>
					<div className={'card__description card__description_back'}>
						{card.back.description}
					</div>
				</div>
			</div>
		</li>
	);
};

export default Card;