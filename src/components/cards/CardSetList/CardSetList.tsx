import { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import CardSet from '../CardSet/CardSet';

import useCard from '../../../hooks/useCard';
import useModal from '../../../hooks/useModal';

import { AiFillFolderAdd } from 'react-icons/ai';

import './CardSetList.scss';


const CardSetList: FC = () => {
	const { cardSets } = useCard();
	const { modalFlashcardSet } = useModal();

	return (
		<div className={'set-list-wrapper'}>
			<TransitionGroup component={'ul'} className={'set-list'}>
				{cardSets.map(cardSet =>
					<CSSTransition key={cardSet.id} timeout={400} classNames={'slide-down'}>
						<CardSet set={cardSet}/>
					</CSSTransition>,
				)}
			</TransitionGroup>

			<button className={'button_add-set'}
					onClick={() => modalFlashcardSet.setVisible(true)}
			>
				<AiFillFolderAdd color={'#babac0'} size={84}/>
			</button>
		</div>
	);
};

export default CardSetList;