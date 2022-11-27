import { FC } from 'react';

import { ICardSet } from '../../../types/card';

import Button from '../../UI/Button/Button';

import { useNavigate } from 'react-router-dom';
import useCard from '../../../hooks/useCard';
import useModal from '../../../hooks/useModal';

import { GrEdit, GrTrash } from 'react-icons/gr';

import './CardSet.scss';


interface FlashcardSetProps {
	set: ICardSet;
}

const CardSet: FC<FlashcardSetProps> = ({ set }) => {
	const navigate = useNavigate();

	const { removeCardSet } = useCard();
	const { modalAlert } = useModal();

	const { modalFlashcardSet } = useModal();

	const renameSet = () => {
		modalFlashcardSet.setEditable(set);
		modalFlashcardSet.setVisible(true);
	};

	const removeSet = () => {
		if (removeCardSet(set.id, false)) {
			return;
		}

		const removeSet = () => {
			modalAlert.hide();
			removeCardSet(set.id);
		}

		modalAlert.show({
			icon: 'warning',
			text: `
				Do you really want to delete this card set with (${set.cards.length}) cards? 
				This process cannot be undone.
			`,
			title: 'Are you sure?',
			width: 500,
			height: 340,
			btnConfirm: <Button Color='gradient-light-red' onClick={removeSet}>Delete</Button>,
			btnCancel: true,
		});
	};

	return (
		<li
			className={'card-set'}
			onClick={() => navigate('/card-sets/' + set?.id)}
		>
			<h2 className={'card-set__title'}>{set.name}</h2>
			<div className="card-set__buttons" onClick={e => e.stopPropagation()}>
				<button
					className={'card-set__button card-set__button_rename'}
					onClick={renameSet}
				>
					<GrEdit size={20}/>
				</button>
				<button
					className={'card-set__button card-set__button_remove'}
					onClick={removeSet}
				>
					<GrTrash size={20}/>
				</button>
			</div>
		</li>
	);
};

export default CardSet;