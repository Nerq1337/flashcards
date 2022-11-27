import { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ICard } from '../../../types/card';

import Card from '../Card/Card';

import './CardList.scss';


interface FlashcardListProps {
	cards: ICard[];
}

const CardList: FC<FlashcardListProps> = ({ cards }) => {

	return (
		<>
			{cards.length === 0 &&
				<h3 className={'list-empty'}>Empty! ヾ(•ω•`)o</h3>
			}

			<TransitionGroup component={'ul'} className={'card-list'}>
				{cards.map(card =>
					<CSSTransition key={card.id} timeout={400} classNames={'left-to-right'}>
						<Card card={card}/>
					</CSSTransition>,
				)}
			</TransitionGroup>
		</>

	);
};

export default CardList;